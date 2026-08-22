import os
import sys
import gc
import subprocess

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

import soundfile as sf
import torch
from omnivoice import OmniVoice

# ==============================================================================
# OMNIVOICE ZERO-SHOT CLONING FOR THE EVOLUTION OF MATHEMATICS (V9)
# Reference Voice: 'audio [vocals]_[cut_10sec].mp3'
# ==============================================================================

CUES = [
    # Ch 1 (Before Numbers -> Grouping Bridge)
    {"id": "ch01_sub01", "text": "Trước khi có con số, con người chỉ nhìn thấy từng thực thể đơn lẻ."},
    {"id": "ch01_sub02", "text": "Mỗi đối tượng được ghi nhớ bằng một vết khắc tương ứng trên đá hoặc xương."},
    {"id": "ch01_sub03", "text": "Nhưng nếu mỗi thứ đều cần một dấu riêng, điều gì xảy ra khi số lượng lớn đến mức ta không còn nhìn nổi?"},

    # Ch 2 (Grouping -> Numeral Systems Bridge)
    {"id": "ch02_sub01", "text": "Những dấu gạch vô tận nhanh chóng vượt quá khả năng ghi nhớ tức thời của bộ não."},
    {"id": "ch02_sub02", "text": "Một bước ngoặt nhận thức xuất hiện: gom các dấu đơn lẻ thành từng cụm năm phần tử."},
    {"id": "ch02_sub03", "text": "Nếu cả một nhóm có thể được thay bằng chỉ một ký hiệu thì sao?"},

    # Ch 3 (Numeral Systems -> Place Value & Zero Bridge)
    {"id": "ch03_sub01", "text": "Mỗi nền văn minh cổ đại sáng tạo nên một hệ thống ký hiệu riêng để ghi lại số lượng."},
    {"id": "ch03_sub02", "text": "Nhưng khi các phép tính mở rộng, những ký tự cộng dồn trở nên quá rườm rà."},
    {"id": "ch03_sub03", "text": "Nếu cùng một ký hiệu có thể đổi giá trị chỉ vì vị trí của nó thì sao?"},

    # Ch 4 (Place Value & Zero -> Counting Beyond Hand Bridge)
    {"id": "ch04_sub01", "text": "Hệ giá trị theo vị trí ra đời: giá trị của một con số được quyết định bởi nơi nó đứng."},
    {"id": "ch04_sub02", "text": "Và một ký hiệu vĩ đại kết tinh từ khoảng trống: số 0 — đại diện cho sự vắng mặt nhưng mở ra vô hạn."},
    {"id": "ch04_sub03", "text": "Nếu chỉ cần thêm vị trí, con số có thể lớn đến đâu?"},

    # Ch 5 (Counting Beyond Hand -> Geometry Bridge)
    {"id": "ch05_sub01", "text": "Từ mười ngón tay ban sơ, con người mở rộng quy mô đếm lên hàng triệu và các bậc lũy thừa."},
    {"id": "ch05_sub02", "text": "Giới hạn cơ thể hoàn toàn tan biến, nhường chỗ cho một chân trời số học thuần túy trừu tượng."},
    {"id": "ch05_sub03", "text": "Nhưng biết có bao nhiêu vẫn chưa cho ta biết chúng ở đâu."},

    # Ch 6 (Geometry -> Multiplication Area Bridge)
    {"id": "ch06_sub01", "text": "Nhu cầu đo đạc đất đai đưa các con số bước vào thế giới thực tại của không gian."},
    {"id": "ch06_sub02", "text": "Sợi dây thừng mười hai nút thắt tạo nên góc vuông hoàn hảo ba bốn năm và mặt phẳng Euclid."},
    {"id": "ch06_sub03", "text": "Một chiều đo độ dài. Nhưng một mặt phẳng cần hai chiều."},

    # Ch 7 (Multiplication Area -> Pythagorean Structure Bridge)
    {"id": "ch07_sub01", "text": "Phép nhân không chỉ là phép cộng lặp lại, nó là sự kiến tạo diện tích hai chiều."},
    {"id": "ch07_sub02", "text": "Hằng đẳng thức hình học: a cộng b tất cả bình phương tách rời thành các mảnh diện tích tuyệt mỹ."},
    {"id": "ch07_sub03", "text": "Nhưng các hình vuông dựng trên những cạnh khác nhau có liên hệ gì với nhau?"},

    # Ch 8 (Pythagorean Structure -> Circle Pi Bridge)
    {"id": "ch08_sub01", "text": "Mọi tam giác vuông đều ẩn chứa một bí mật bất biến về diện tích gắn liền với ba cạnh."},
    {"id": "ch08_sub02", "text": "Định lý Pythagoras: diện tích hai hình vuông nhỏ ghép vừa khít vào hình vuông cạnh huyền."},
    {"id": "ch08_sub03", "text": "Nhưng thế giới không chỉ được tạo từ đường thẳng."},

    # Ch 9 (Circle Pi -> Negative Numbers Bridge)
    {"id": "ch09_sub01", "text": "Đường tròn xuất hiện như hình học đối xứng tuyệt đối từ một tâm duy nhất."},
    {"id": "ch09_sub02", "text": "Mở cuộn chu vi và phân rã nan quạt: Tỷ lệ chu vi trên đường kính luôn là hằng số Pi bất biến."},
    {"id": "ch09_sub03", "text": "Nhưng điều gì xảy ra khi phép tính đi xuyên qua số 0?"},

    # Ch 10 (Negative Numbers -> Algebra Bridge)
    {"id": "ch10_sub01", "text": "Khi ba trừ năm không còn vô nghĩa, một nửa thế giới phía bên trái số không mở ra."},
    {"id": "ch10_sub02", "text": "Số âm không phải là sự thiếu hụt vật lý, nó là sự đổi hướng hoàn hảo trên trục số."},
    {"id": "ch10_sub03", "text": "Nhưng nếu con số tồn tại trong bài toán mà ta chưa biết nó là bao nhiêu?"},

    # Ch 11 (Algebra -> Functions Bridge)
    {"id": "ch11_sub01", "text": "Một chiếc hộp rỗng giấu giá trị ẩn số biến thành biến số x kỳ diệu."},
    {"id": "ch11_sub02", "text": "Phương trình như một chiếc cân thăng bằng: giữ công bằng cho cả hai vế để tìm ra sự thật."},
    {"id": "ch11_sub03", "text": "Nếu x không chỉ có một giá trị mà liên tục thay đổi thì sao?"},

    # Ch 12 (Functions -> Waves Bridge)
    {"id": "ch12_sub01", "text": "Hàm số ra đời: một cỗ máy biến đổi đưa vào một đầu vào và sinh ra một đầu ra tương ứng."},
    {"id": "ch12_sub02", "text": "Đại số và Hình học hòa quyện thành đồ thị Parabol uốn lượn tuyệt mỹ trong không gian tọa độ."},
    {"id": "ch12_sub03", "text": "Có những chuyển động không chỉ thay đổi. Chúng quay trở lại."},

    # Ch 13 (Trigonometry/Waves -> Irrational Numbers Bridge)
    {"id": "ch13_sub01", "text": "Một điểm chuyển động tròn đều chiếu xuống không gian sinh ra sóng hình sin bất tận."},
    {"id": "ch13_sub02", "text": "Từ nhịp đập con lắc, sóng nước, âm thanh đến bức xạ ánh sáng: Vũ trụ dao động theo nhịp điệu toán học."},
    {"id": "ch13_sub03", "text": "Ngay cả một hình vuông hoàn hảo cũng giấu một con số không chịu kết thúc."},

    # Ch 14 (Irrational Numbers -> Infinity Bridge)
    {"id": "ch14_sub01", "text": "Đường chéo của hình vuông đơn vị mở ra căn bậc hai của hai: một đại lượng không thể viết thành phân số."},
    {"id": "ch14_sub02", "text": "Những con số vô tỉ tuôn chảy thành dãy số thập phân bất tận không bao giờ tuần hoàn."},
    {"id": "ch14_sub03", "text": "Nếu các chữ số không bao giờ kết thúc, ta đang nhìn vào một con số hay một quá trình vô hạn?"},

    # Ch 15 (Infinity -> Prime Numbers Bridge)
    {"id": "ch15_sub01", "text": "Chia đôi quãng đường một nửa cộng một phần tư cộng một phần tám: chuỗi vô hạn tiệm cận về một."},
    {"id": "ch15_sub02", "text": "Biểu tượng vô cực xuất hiện: không phải một điểm dừng, mà là một chân trời mở rộng không đáy."},
    {"id": "ch15_sub03", "text": "Giữa vô hạn con số, có những số không thể bị tách nhỏ theo cách thông thường."},

    # Ch 16 (Prime Numbers -> Complex Numbers Bridge)
    {"id": "ch16_sub01", "text": "Các hợp số vỡ vụn thành những khối thừa số nhỏ, nhưng số nguyên tố kiên cường giữ nguyên bản thể."},
    {"id": "ch16_sub02", "text": "Sàng Eratosthenes quét qua đại dương số học, để lại những viên ngọc nguyên tố phát sáng rực rỡ."},
    {"id": "ch16_sub03", "text": "Nhưng có những phương trình mà không một số nào trên đường số trả lời được."},

    # Ch 17 (Complex Numbers -> Calculus Bridge)
    {"id": "ch17_sub01", "text": "Phương trình x bình phương bằng trừ một xé toạc trục số thực, mở ra đơn vị ảo i trên trục thẳng đứng."},
    {"id": "ch17_sub02", "text": "Mặt phẳng phức ra đời: Nhân với i trở thành phép quay chín mươi độ thuần khiết và kỳ ảo."},
    {"id": "ch17_sub03", "text": "Biết một vật đang ở đâu vẫn chưa cho ta biết nó đang thay đổi nhanh đến mức nào."},
]

@torch.inference_mode()
def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    out_dir = os.path.join(root_dir, "public", "audio", "voice_evolution")
    os.makedirs(out_dir, exist_ok=True)

    ref_audio_path = os.path.join(root_dir, "audio [vocals]_[cut_10sec].mp3")

    print("==================================================")
    print("      OMNIVOICE CLONING PIPELINE — V9 FILM        ")
    print(f"Reference Audio: {ref_audio_path}")
    print("==================================================")

    if not os.path.exists(ref_audio_path):
        print(f"❌ Không tìm thấy file giọng mẫu: {ref_audio_path}")
        return

    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    dtype = torch.float16 if torch.cuda.is_available() else torch.float32

    print(f"🎙️ Đang nạp mô hình OmniVoice trên thiết bị: {device}...")
    model = OmniVoice.from_pretrained("k2-fsa/OmniVoice", device_map=device, dtype=dtype)
    model.eval()

    print("🔊 Đang phân tích giọng mẫu 'audio [vocals]_[cut_10sec].mp3'...")
    voice_prompt = model.create_voice_clone_prompt(ref_audio=ref_audio_path)
    print("✅ Đã tạo Voice Clone Prompt thành công!")

    print(f"\n🚀 Bắt đầu clone giọng cho {len(CUES)} câu thoại tiếng Việt V9...\n")

    for i, cue in enumerate(CUES, 1):
        target_wav = os.path.join(out_dir, f"{cue['id']}.wav")
        target_mp3 = os.path.join(out_dir, f"{cue['id']}.mp3")

        # Skip if already exists and valid size (> 5KB)
        if os.path.exists(target_mp3) and os.path.getsize(target_mp3) > 5000:
            print(f"[{i}/{len(CUES)}] ⏭️ Đã có sẵn: {cue['id']} -> Bỏ qua.")
            continue

        print(f"[{i}/{len(CUES)}] Đang tạo: {cue['id']} -> \"{cue['text'][:35]}...\"")

        audio_outputs = model.generate(
            text=cue["text"],
            language="vi",
            voice_clone_prompt=voice_prompt,
            speed=1.0,
        )

        audio_np = audio_outputs[0]
        # Save as 24kHz WAV
        sf.write(target_wav, audio_np, 24000)

        # Convert to MP3
        subprocess.run(
            ["ffmpeg", "-y", "-i", target_wav, "-b:a", "192k", target_mp3],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        if os.path.exists(target_wav):
            os.remove(target_wav)

        # Clean memory after each iteration
        del audio_outputs
        del audio_np
        gc.collect()

    print(f"\n🎉 Đã tạo xong tất cả {len(CUES)} file âm thanh giọng clone trong {out_dir}!")
    print("⚡ Đang tự động khóa mốc thời gian phụ đề và hoạt họa...")
    subprocess.run(["node", "measure_and_lock_evolution_timings.js"], cwd=root_dir)

if __name__ == "__main__":
    main()
