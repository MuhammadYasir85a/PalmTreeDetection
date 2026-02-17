import os
import uuid

def save_file(file, save_dir):
    os.makedirs(save_dir, exist_ok=True)
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    path = os.path.join(save_dir, filename)
    file.save(path)
    return path
