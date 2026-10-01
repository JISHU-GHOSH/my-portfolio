import cv2
import numpy as np
import os

video_path = r"c:\Users\jishu\Documents\antigravity\peaceful-raman\Man_tracking_with_head_animation_20261001001628.mp4"
out_dir = r"c:\Users\jishu\Documents\antigravity\peaceful-raman\portfolio-hero\public\frames"
os.makedirs(out_dir, exist_ok=True)

frame_map = [
    102, 95, 93, 91, 90, 88, 87, 85,
    78, 71, 68, 66, 63, 61, 58, 56,
    47, 39, 30, 24, 226, 222, 218, 214,
    210, 207, 205, 203, 201, 199, 198, 196,
    188, 181, 179, 177, 175, 173, 171, 170,
    161, 153, 150, 147, 145, 142, 140, 138,
    133, 129, 127, 126, 125, 123, 122, 121,
    120, 118, 117, 115, 114, 112, 111, 110
]

def inpaint_frame(img):
    mask = np.zeros(img.shape[:2], dtype=np.uint8)
    mask[790:1010, 1590:1860] = 255
    return cv2.inpaint(img, mask, 6, cv2.INPAINT_TELEA)

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error opening video")
    exit(1)

frames = {}
frame_idx = 0
while True:
    ret, frame = cap.read()
    if not ret:
        break
    if frame_idx in frame_map or frame_idx == 236:
        frames[frame_idx] = frame
    frame_idx += 1
cap.release()

print("Extracted frames, starting inpainting and saving...")

output_frames = []
for i, f_idx in enumerate(frame_map):
    img = frames[f_idx]
    inpainted = inpaint_frame(img)
    output_frames.append(inpainted)
    out_path = os.path.join(out_dir, f"{i:03d}.webp")
    cv2.imwrite(out_path, inpainted, [cv2.IMWRITE_WEBP_QUALITY, 92])

img_center = frames[236]
inpainted_center = inpaint_frame(img_center)
cv2.imwrite(os.path.join(out_dir, "center.webp"), inpainted_center, [cv2.IMWRITE_WEBP_QUALITY, 92])

print("Finished saving, calculating diffs...")

diffs = []
for i in range(len(output_frames) - 1):
    diff = np.mean(cv2.absdiff(output_frames[i], output_frames[i+1]))
    diffs.append((i, i+1, diff))

# wrap around
diff_wrap = np.mean(cv2.absdiff(output_frames[-1], output_frames[0]))
diffs.append((63, 0, diff_wrap))

print("Diff Report:")
low_diffs = 0
for i, j, d in diffs:
    print(f"{i}->{j}: {d:.3f}")
    if d < 1.0 and not (i == 19 and j == 20):
        low_diffs += 1
        print(f"  WARNING: Diff < 1.0 at {i}->{j}")

d_vals = [d for _, _, d in diffs]
print(f"\nAverage diff: {np.mean(d_vals):.3f}")
print(f"Min diff: {np.min(d_vals):.3f}")
print(f"Max diff: {np.max(d_vals):.3f}")
print(f"Low diff pairs (< 1.0, excluding 19->20): {low_diffs}")
