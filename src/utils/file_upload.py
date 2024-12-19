from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PyPDF2 import PdfReader
from dotenv import load_dotenv
from openai import OpenAI
import logging
import os
import time

# Load the .env file explicitly
dotenv_path = "C:\\Users\\dusti\\OneDrive\\Desktop\\code\\tsb\\.env"
load_dotenv(dotenv_path=dotenv_path)

# Check if API key is loaded
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("ERROR: API Key is not loaded. Check your .env file or environment variable setup.")

# Initialize the OpenAI client
client = OpenAI(api_key=api_key)

# Configure logging (for debugging purposes)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Define a response model
class UploadResponse(BaseModel):
    file_name: str
    text: str
    word_count: int
    summary: str
    status: str

# Create FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Frontend during development
        "https://transcript-summarization-bot.vercel.app", #Vercel domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload", response_model=UploadResponse)
async def upload_file(file: UploadFile = File(...)) -> UploadResponse:
    start_time = time.time()
    try:
        # Log: File upload request received
        logger.info(f"File upload request received. File name: {file.filename}, Content type: {file.content_type}")

        # Validate file type
        if file.content_type not in ["application/pdf", "text/plain"]:
            logger.error("Unsupported file type.")
            raise HTTPException(status_code=400, detail="Unsupported file type. Only PDF and TXT are allowed.")

        logger.info("File type validation passed.")

        # Parse file text
        file_text = ""
        if file.content_type == "text/plain":
            logger.info("Processing text file...")
            file_text = (await file.read()).decode("utf-8")
        elif file.content_type == "application/pdf":
            logger.info("Processing PDF file...")
            reader = PdfReader(file.file)
            for page in reader.pages:
                extracted_text = page.extract_text()
                logger.debug(f"Extracted text from page: {extracted_text[:100]}...")  # Log first 100 chars
                file_text += extracted_text

        if not file_text.strip():
            logger.error("Failed to extract text from the file.")
            raise HTTPException(status_code=400, detail="Failed to extract text from the file.")

        logger.info(f"Extracted text length: {len(file_text)} characters.")

        # Calculate word count
        word_count = len(file_text.split())
        logger.info(f"Word count calculated: {word_count}")

        # Summarize the text using OpenAI
        system_instructions = (
            "Respond with clear, actionable, and structured answers. "
            "Start with a 2-4 sentence summary providing a high-level overview of the topic. "
            "Follow the summary with well-structured sections that organize the details logically. "
            "Use subheadings, bullet points, and concise sentences for clarity. "
            "Focus on practicality and avoid unnecessary verbosity. "
            "Present information in an easy-to-follow format suitable for a broad audience."
        )
        user_prompt = (
            "Summarize the following text with clarity and brevity. "
            "Begin with a high-level summary of the main ideas in 2-4 sentences. "
            "End with a 1-3 sentence summary/conclusion."
            "After the summary, organize the detailed content into sections with subheadings. "
            "Each section should provide practical, actionable insights using bullet points or numbered lists. "
            "Avoid long paragraphs and ensure the response is easy to read and follow. "
            "Don't include a 'summary' text title/heading at the top"
            "Use simple language, and structure the response so it is accessible to a general audience:\n\n"
            f"{file_text}"
        )

        logger.info("Sending request to OpenAI API for summarization...")
        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_instructions},
                    {"role": "user", "content": user_prompt},
                ],
                max_tokens=1250,
                temperature=0.7,
            )
            summary = response.choices[0].message.content.strip()
            logger.info("OpenAI summarization successful.")
        except Exception as e:
            logger.error(f"OpenAI API error: {e}")
            raise HTTPException(status_code=500, detail="Failed to summarize text using OpenAI.")

        # Return the response with file details, parsed text, word count, and summary
        logger.info("Returning summarization response.")
        total_time = time.time() - start_time
        logger.info(f"Total processing time: {total_time:.2f} seconds.")
        return UploadResponse(
            file_name=file.filename,
            text=file_text,
            word_count=word_count,
            summary=summary,
            status="File uploaded, parsed, and summarized successfully",
        )
    except HTTPException as he:
        logger.error(f"HTTPException raised: {he.detail}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="Unexpected error occurred.")
