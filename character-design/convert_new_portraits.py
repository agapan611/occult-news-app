"""
新規生成の GPT 画像を WebP (512x768) に変換して public/ に配置する。

- src: C:/AI/ComfyUI/output/ 配下の新しい png
- dst: public/shuna.webp, public/raika.webp
- 品質 85、method=6（最高圧縮効率）、Lanczos リサンプリング

実行: python convert_new_portraits.py
"""
from PIL import Image
import os

PAIRS = [
    (r"C:\AI\ComfyUI\output\ChatGPT Image 2026年4月23日 16_17_38.png",
     r"C:\クラウドコード\occult-news-app\public\shuna.webp"),
    (r"C:\AI\ComfyUI\output\ChatGPT Image 2026年4月23日 16_13_48.png",
     r"C:\クラウドコード\occult-news-app\public\raika.webp"),
]

TARGET = (512, 768)

for src, dst in PAIRS:
    im = Image.open(src)
    im_resized = im.resize(TARGET, Image.Resampling.LANCZOS)
    im_resized.save(dst, format="WEBP", quality=85, method=6)
    size_kb = os.path.getsize(dst) / 1024
    name = os.path.basename(dst)
    print(f"{name}: {im.size} -> {TARGET}  ({size_kb:.1f} KB)")

print("done")
