# ==============================================================================
# OMNIVOICE COLAB SCRIPT — TẠO TOÀN BỘ CÁC CHƯƠNG CÒN LẠI (CHƯƠNG 31 ĐẾN 42 - 36 CÂU)
# ==============================================================================
# Hướng dẫn chạy trên Google Colab:
# 1. Mở Google Colab: https://colab.research.google.com/
# 2. Chọn Menu Runtime -> Change runtime type -> Chọn GPU (T4 GPU miễn phí)
# 3. Kéo thả file âm thanh mẫu giọng đọc (audio [vocals]_[cut_10sec].mp3 hoặc .wav) vào mục Files bên trái
# 4. Copy toàn bộ file này vào ô code Colab và nhấn Play (Chạy)
# 5. File 'voice_evolution_ch31_42.zip' sẽ tự động tạo và tải về máy tính của bạn!
# ==============================================================================

import os
import subprocess

print("📦 Đang cài đặt OmniVoice từ GitHub và các thư viện hỗ trợ...")
subprocess.run(["pip", "install", "-q", "git+https://github.com/k2-fsa/OmniVoice.git", "soundfile", "torchaudio", "transformers", "accelerate"])

import torch
import soundfile as sf
from omnivoice import OmniVoice
from google.colab import files

# TOÀN BỘ CÁC CÂU THOẠI CẦN TẠO (GỒM ĐOẠN HOOK MỞ ĐẦU & CÁC CHƯƠNG)
CUES = [
    # 🎬 CINEMATIC HOOK INTRO (00. Cuốn Đại Thư Tịch 3D Mở Đầu)
    {"id": "ch00_hook_sub01", "text": "Nếu toàn bộ vũ trụ được viết bằng một thứ ngôn ngữ bí mật, thì đó chính là toán học."},
    {"id": "ch00_hook_sub02", "text": "Từ một vết khía đơn sơ trên thanh xương cổ đại, đến các mạng nơ-ron định hình tương lai nhân loại."},
    {"id": "ch00_hook_sub03", "text": "Hãy cùng mở ra cuốn đại thư tịch, và bắt đầu hành trình vĩ đại này."},

    # Ch 31 (Information Becomes Data)
    {"id": "ch31_sub01", "text": "Một con chip chỉ hiểu những con số, nhưng thế giới thực lại ngập tràn hình ảnh, âm thanh và văn bản."},
    {"id": "ch31_sub02", "text": "Mỗi điểm ảnh tách thành các giá trị đỏ lục lam, sóng âm được lấy mẫu theo thời gian, và chữ viết hóa thành mã nhị phân."},
    {"id": "ch31_sub03", "text": "Khi hàng triệu con số phải thay đổi cùng một lúc, làm thế nào để toán học tổ chức chúng một cách có trật tự?"},

    # Ch 32 (Matrices & Linear Algebra)
    {"id": "ch32_sub01", "text": "Ma trận ra đời như một mảng số hai chiều kỳ diệu để chỉ huy vô số phép biến đổi đồng thời."},
    {"id": "ch32_sub02", "text": "Chỉ bằng một phép nhân ma trận, toàn bộ không gian được xoay chuyển, co giãn, kéo nghiêng và phản chiếu mượt mà."},
    {"id": "ch32_sub03", "text": "Nếu những tọa độ ma trận đó là các đỉnh của một vật thể, liệu ta có thể dựng nên cả một thế giới ảo?"},

    # Ch 33 (Computer Graphics)
    {"id": "ch33_sub01", "text": "Từ những vector tọa độ sơ khai, các hình tam giác liên kết lại tạo thành khung lưới ba chiều sống động."},
    {"id": "ch33_sub02", "text": "Phép chiếu hình học và đổ bóng ánh sáng biến các phương trình trừu tượng thành những khung cảnh rực rỡ trên màn hình."},
    {"id": "ch33_sub03", "text": "Nhưng một âm thanh hay tín hiệu tự nhiên không phải là lưới tam giác, nó là một chuyển động phức tạp hơn rất nhiều."},

    # Ch 34 (Fourier & Signal Processing)
    {"id": "ch34_sub01", "text": "Biến đổi Fourier tiết lộ bí mật kinh ngạc: Mọi dạng sóng phức tạp đều là sự hòa âm của những sóng sin đơn giản."},
    {"id": "ch34_sub02", "text": "Tách rời tín hiệu thành các tần số giúp loài người nén âm nhạc, truyền tải hình ảnh và nhìn xuyên qua cơ thể người."},
    {"id": "ch34_sub03", "text": "Dữ liệu sau khi được mã hóa và xử lý không thể đứng yên, nó phải tìm đường di chuyển giữa các mạng lưới."},

    # Ch 35 (Graph Theory & Networks)
    {"id": "ch35_sub01", "text": "Lý thuyết đồ thị mô hình hóa các mối liên kết thông qua những điểm nút và cạnh nối vô hình."},
    {"id": "ch35_sub02", "text": "Từ thuật toán tìm đường đi ngắn nhất đến định tuyến Internet: Dòng chảy thông tin luôn tìm thấy lối đi tối ưu nhất."},
    {"id": "ch35_sub03", "text": "Nếu dữ liệu phải đi qua những con đường công cộng rộng lớn, làm sao để giữ trọn vẹn sự bí mật của thông tin?"},

    # Ch 36 (Cryptography & Security)
    {"id": "ch36_sub01", "text": "Mật mã học hiện đại sử dụng vẻ đẹp bất đối xứng của toán học để khóa chặt ý nghĩa của thông điệp."},
    {"id": "ch36_sub02", "text": "Phép nhân hai số nguyên tố khổng lồ thì dễ dàng, nhưng phân tích ngược lại đòi hỏi hàng nghìn năm tính toán."},
    {"id": "ch36_sub03", "text": "Nếu dữ liệu không bị kẻ xấu đọc trộm mà chỉ đơn giản bị méo mó và hư hỏng trên đường truyền thì sao?"},

    # Ch 37 (Information Theory & Error Correction)
    {"id": "ch37_sub01", "text": "Claude Shannon định nghĩa entropy để đo lường lượng tin và giới hạn nén tối đa của mọi kênh truyền."},
    {"id": "ch37_sub02", "text": "Mã sửa lỗi chèn thêm các cấu trúc dự phòng thông minh, giúp thông tin tự hồi sinh nguyên vẹn dù bị nhiễu loạn tấn công."},
    {"id": "ch37_sub03", "text": "Khi đứng trước hàng triệu sự lựa chọn và trạng thái khác nhau, làm thế nào để thuật toán tìm ra trạng thái tốt nhất?"},

    # Ch 38 (Optimization & Gradient Descent)
    {"id": "ch38_sub01", "text": "Thuật toán tối ưu hóa biến mọi bài toán thành một địa hình đồi núi của hàm mất mát."},
    {"id": "ch38_sub02", "text": "Phương pháp hạ gradient lần theo độ dốc âm của đạo hàm, kiên nhẫn dẫn lối tham số xuống đáy thung lũng sâu nhất."},
    {"id": "ch38_sub03", "text": "Nếu những tham số đó thuộc về một hệ thống có hàng tỷ kết nối chéo nhau, điều kỳ diệu gì sẽ xảy ra?"},

    # Ch 39 (Neural Networks & Deep Learning)
    {"id": "ch39_sub01", "text": "Mỗi nơ-ron nhân tạo nhận tín hiệu, nhân với trọng số, cộng lại và kích hoạt theo phi tuyến tính."},
    {"id": "ch39_sub02", "text": "Thuật toán lan truyền ngược đưa sai số chảy ngược dòng mạng, tự động tinh chỉnh hàng tỷ trọng số để học hỏi tri thức."},
    {"id": "ch39_sub03", "text": "Để trí tuệ nhân tạo hiểu được ngôn ngữ và thế giới, làm thế nào để biến ý niệm thành không gian toán học?"},

    # Ch 40 (AI Representation & Latent Space)
    {"id": "ch40_sub01", "text": "Từ ngữ, hình ảnh và âm thanh được nhúng thành các vector trong không gian tiềm ẩn hàng nghìn chiều."},
    {"id": "ch40_sub02", "text": "Cơ chế chú ý Attention kết nối ngữ cảnh của vạn vật, biến các phép tính ma trận thành sự thấu hiểu sâu sắc."},
    {"id": "ch40_sub03", "text": "Và trí tuệ nhân tạo hôm nay chỉ là một trong vô vàn nơi toán học đang âm thầm vận hành thế giới."},

    # Ch 41 (Mathematics Beneath Modern Life)
    {"id": "ch41_sub01", "text": "Từ tín hiệu định vị vệ tinh GPS, quét cộng hưởng từ MRI đến dự báo thời tiết và mạng lưới tài chính toàn cầu."},
    {"id": "ch41_sub02", "text": "Lớp vỏ công nghệ hiện đại bóc tách để lộ ra những phương trình vi phân, đại số tuyến tính và xác suất thống kê."},
    {"id": "ch41_sub03", "text": "Nhưng toàn bộ nền văn minh phức tạp và tráng lệ này đã bắt đầu từ điều gì đơn sơ nhất?"},

    # Ch 42 (Final Return to the Point)
    {"id": "ch42_sub01", "text": "Mọi thuật toán AI, hàng tỷ bóng bán dẫn, các phương trình giải tích và hệ tọa độ dần sụp đổ ngược dòng thời gian."},
    {"id": "ch42_sub02", "text": "Tất cả các con số, hình học và vết khắc cổ xưa thu bé lại thành một vòng lặp vô cực thuần khiết."},
    {"id": "ch42_sub03", "text": "Và từ vô cực, mọi sự tồn tại trở về với một Điểm sáng nguyên thủy duy nhất giữa hư không: Từ Một đến Tất Cả."}
]

print(f"Tổng số câu thoại mới cần tạo: {len(CUES)} câu thoại (Chương 31 đến 42).")

# Tìm file audio mẫu
REF_AUDIO = "audio [vocals]_[cut_10sec].mp3"
if not os.path.exists(REF_AUDIO):
    for f in os.listdir("."):
        if f.endswith(".mp3") or f.endswith(".wav"):
            REF_AUDIO = f
            break

print(f"🎤 File âm thanh mẫu sử dụng để clone giọng: {REF_AUDIO}")

# Tải model OmniVoice
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"🚀 Thiết bị tính toán: {device}")
model = OmniVoice.from_pretrained("k2-fsa/OmniVoice").to(device)

os.makedirs("voice_evolution_ch31_42", exist_ok=True)

# Tiến hành sinh giọng đọc
for idx, cue in enumerate(CUES, 1):
    cue_id = cue["id"]
    text = cue["text"]
    out_path = f"voice_evolution_ch31_42/{cue_id}.mp3"
    print(f"[{idx}/{len(CUES)}] Đang tạo: {cue_id} -> \"{text}\"")
    
    try:
        wav = model.generate(
            text=text,
            ref_audio=REF_AUDIO,
            language="vi"
        )
        sf.write(out_path, wav, 24000)
    except Exception as e:
        print(f"Lỗi khi tạo {cue_id}: {e}")

# Nén zip và tải về
print("📦 Đang nén thành file zip voice_evolution_ch31_42.zip...")
subprocess.run(["zip", "-r", "voice_evolution_ch31_42.zip", "voice_evolution_ch31_42"])

print("✅ Đã hoàn thành 36/36 câu thoại! Đang tải file zip về máy...")
files.download("voice_evolution_ch31_42.zip")
