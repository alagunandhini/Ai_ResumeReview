from faster_whisper import WhisperModel
import sys

audio_path = sys.argv[1]

model = WhisperModel("small", device="cpu")

segments, info = model.transcribe(audio_path)

text = " ".join(segment.text for segment in segments)

print(text.strip())
