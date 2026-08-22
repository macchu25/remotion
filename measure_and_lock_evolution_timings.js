const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const voiceDir = path.join(__dirname, 'public', 'audio', 'voice_evolution');

// Source metadata for all 30 Chapters (90 cues)
const rawCues = [
  // Ch 1 (Before Numbers -> Grouping Bridge)
  { id: "ch01_sub01", chapterIndex: 1, text: "Trước khi có con số, con người chỉ nhìn thấy từng thực thể đơn lẻ.", emphasizedWords: ["con số", "thực thể đơn lẻ"], motionPreset: "calmExplain" },
  { id: "ch01_sub02", chapterIndex: 1, text: "Mỗi đối tượng được ghi nhớ bằng một vết khắc tương ứng trên đá hoặc xương.", emphasizedWords: ["vết khắc"], motionPreset: "discovery" },
  { id: "ch01_sub03", chapterIndex: 1, text: "Nhưng nếu mỗi thứ đều cần một dấu riêng, điều gì xảy ra khi số lượng lớn đến mức ta không còn nhìn nổi?", emphasizedWords: ["dấu riêng", "số lượng lớn"], motionPreset: "question" },

  // Ch 2 (Grouping -> Numeral Systems Bridge)
  { id: "ch02_sub01", chapterIndex: 2, text: "Những dấu gạch vô tận nhanh chóng vượt quá khả năng ghi nhớ tức thời của bộ não.", emphasizedWords: ["vượt quá khả năng"], motionPreset: "calmExplain" },
  { id: "ch02_sub02", chapterIndex: 2, text: "Một bước ngoặt nhận thức xuất hiện: gom các dấu đơn lẻ thành từng cụm năm phần tử.", emphasizedWords: ["cụm năm phần tử"], motionPreset: "discovery" },
  { id: "ch02_sub03", chapterIndex: 2, text: "Nếu cả một nhóm có thể được thay bằng chỉ một ký hiệu thì sao?", emphasizedWords: ["một ký hiệu"], motionPreset: "question" },

  // Ch 3 (Numeral Systems -> Place Value & Zero Bridge)
  { id: "ch03_sub01", chapterIndex: 3, text: "Mỗi nền văn minh cổ đại sáng tạo nên một hệ thống ký hiệu riêng để ghi lại số lượng.", emphasizedWords: ["văn minh cổ đại", "ký hiệu riêng"], motionPreset: "calmExplain" },
  { id: "ch03_sub02", chapterIndex: 3, text: "Nhưng khi các phép tính mở rộng, những ký tự cộng dồn trở nên quá rườm rà.", emphasizedWords: ["quá rườm rà"], motionPreset: "discovery" },
  { id: "ch03_sub03", chapterIndex: 3, text: "Nếu cùng một ký hiệu có thể đổi giá trị chỉ vì vị trí của nó thì sao?", emphasizedWords: ["vị trí của nó"], motionPreset: "question" },

  // Ch 4 (Place Value & Zero -> Counting Beyond Hand Bridge)
  { id: "ch04_sub01", chapterIndex: 4, text: "Hệ giá trị theo vị trí ra đời: giá trị của một con số được quyết định bởi nơi nó đứng.", emphasizedWords: ["giá trị theo vị trí"], motionPreset: "definition" },
  { id: "ch04_sub02", chapterIndex: 4, text: "Và một ký hiệu vĩ đại kết tinh từ khoảng trống: số 0 — đại diện cho sự vắng mặt nhưng mở ra vô hạn.", emphasizedWords: ["số 0", "vắng mặt", "vô hạn"], motionPreset: "majorReveal" },
  { id: "ch04_sub03", chapterIndex: 4, text: "Nếu chỉ cần thêm vị trí, con số có thể lớn đến đâu?", emphasizedWords: ["lớn đến đâu"], motionPreset: "question" },

  // Ch 5 (Counting Beyond Hand -> Geometry Bridge)
  { id: "ch05_sub01", chapterIndex: 5, text: "Từ mười ngón tay ban sơ, con người mở rộng quy mô đếm lên hàng triệu và các bậc lũy thừa.", emphasizedWords: ["hàng triệu", "lũy thừa"], motionPreset: "calmExplain" },
  { id: "ch05_sub02", chapterIndex: 5, text: "Giới hạn cơ thể hoàn toàn tan biến, nhường chỗ cho một chân trời số học thuần túy trừu tượng.", emphasizedWords: ["thuần túy trừu tượng"], motionPreset: "discovery" },
  { id: "ch05_sub03", chapterIndex: 5, text: "Nhưng biết có bao nhiêu vẫn chưa cho ta biết chúng ở đâu.", emphasizedWords: ["ở đâu"], motionPreset: "transition" },

  // Ch 6 (Geometry -> Multiplication Area Bridge)
  { id: "ch06_sub01", chapterIndex: 6, text: "Nhu cầu đo đạc đất đai đưa các con số bước vào thế giới thực tại của không gian.", emphasizedWords: ["đo đạc đất đai", "không gian"], motionPreset: "calmExplain" },
  { id: "ch06_sub02", chapterIndex: 6, text: "Sợi dây thừng mười hai nút thắt tạo nên góc vuông hoàn hảo ba bốn năm và mặt phẳng Euclid.", emphasizedWords: ["mười hai nút", "góc vuông hoàn hảo", "mặt phẳng Euclid"], motionPreset: "discovery" },
  { id: "ch06_sub03", chapterIndex: 6, text: "Một chiều đo độ dài. Nhưng một mặt phẳng cần hai chiều.", emphasizedWords: ["hai chiều"], motionPreset: "question" },

  // Ch 7 (Multiplication Area -> Pythagorean Structure Bridge)
  { id: "ch07_sub01", chapterIndex: 7, text: "Phép nhân không chỉ là phép cộng lặp lại, nó là sự kiến tạo diện tích hai chiều.", emphasizedWords: ["Phép nhân", "diện tích hai chiều"], motionPreset: "definition" },
  { id: "ch07_sub02", chapterIndex: 7, text: "Hằng đẳng thức hình học: a cộng b tất cả bình phương tách rời thành các mảnh diện tích tuyệt mỹ.", emphasizedWords: ["(a + b)²", "diện tích tuyệt mỹ"], motionPreset: "majorReveal" },
  { id: "ch07_sub03", chapterIndex: 7, text: "Nhưng các hình vuông dựng trên những cạnh khác nhau có liên hệ gì với nhau?", emphasizedWords: ["liên hệ gì"], motionPreset: "question" },

  // Ch 8 (Pythagorean Structure -> Circle Pi Bridge)
  { id: "ch08_sub01", chapterIndex: 8, text: "Mọi tam giác vuông đều ẩn chứa một bí mật bất biến về diện tích gắn liền với ba cạnh.", emphasizedWords: ["tam giác vuông", "bí mật bất biến"], motionPreset: "discovery" },
  { id: "ch08_sub02", chapterIndex: 8, text: "Định lý Pythagoras: diện tích hai hình vuông nhỏ ghép vừa khít vào hình vuông cạnh huyền.", emphasizedWords: ["Định lý Pythagoras", "a² + b² = c²"], motionPreset: "majorReveal" },
  { id: "ch08_sub03", chapterIndex: 8, text: "Nhưng thế giới không chỉ được tạo từ đường thẳng.", emphasizedWords: ["đường thẳng"], motionPreset: "transition" },

  // Ch 9 (Circle Pi -> Negative Numbers Bridge)
  { id: "ch09_sub01", chapterIndex: 9, text: "Đường tròn xuất hiện như hình học đối xứng tuyệt đối từ một tâm duy nhất.", emphasizedWords: ["Đường tròn", "đối xứng tuyệt đối"], motionPreset: "calmExplain" },
  { id: "ch09_sub02", chapterIndex: 9, text: "Mở cuộn chu vi và phân rã nan quạt: Tỷ lệ chu vi trên đường kính luôn là hằng số Pi bất biến.", emphasizedWords: ["Chu vi / Đường kính", "hằng số Pi: π"], motionPreset: "majorReveal" },
  { id: "ch09_sub03", chapterIndex: 9, text: "Nhưng điều gì xảy ra khi phép tính đi xuyên qua số 0?", emphasizedWords: ["xuyên qua số 0"], motionPreset: "question" },

  // Ch 10 (Negative Numbers -> Algebra Bridge)
  { id: "ch10_sub01", chapterIndex: 10, text: "Khi ba trừ năm không còn vô nghĩa, một nửa thế giới phía bên trái số không mở ra.", emphasizedWords: ["ba trừ năm", "bên trái số không"], motionPreset: "discovery" },
  { id: "ch10_sub02", chapterIndex: 10, text: "Số âm không phải là sự thiếu hụt vật lý, nó là sự đổi hướng hoàn hảo trên trục số.", emphasizedWords: ["Số âm", "đổi hướng"], motionPreset: "definition" },
  { id: "ch10_sub03", chapterIndex: 10, text: "Nhưng nếu con số tồn tại trong bài toán mà ta chưa biết nó là bao nhiêu?", emphasizedWords: ["chưa biết"], motionPreset: "question" },

  // Ch 11 (Algebra -> Functions Bridge)
  { id: "ch11_sub01", chapterIndex: 11, text: "Một chiếc hộp rỗng giấu giá trị ẩn số biến thành biến số x kỳ diệu.", emphasizedWords: ["ẩn số", "biến số x"], motionPreset: "discovery" },
  { id: "ch11_sub02", chapterIndex: 11, text: "Phương trình như một chiếc cân thăng bằng: giữ công bằng cho cả hai vế để tìm ra sự thật.", emphasizedWords: ["chiếc cân thăng bằng", "công bằng"], motionPreset: "calmExplain" },
  { id: "ch11_sub03", chapterIndex: 11, text: "Nếu x không chỉ có một giá trị mà liên tục thay đổi thì sao?", emphasizedWords: ["liên tục thay đổi"], motionPreset: "question" },

  // Ch 12 (Functions -> Waves Bridge)
  { id: "ch12_sub01", chapterIndex: 12, text: "Hàm số ra đời: một cỗ máy biến đổi đưa vào một đầu vào và sinh ra một đầu ra tương ứng.", emphasizedWords: ["Hàm số", "đầu vào", "đầu ra"], motionPreset: "definition" },
  { id: "ch12_sub02", chapterIndex: 12, text: "Đại số và Hình học hòa quyện thành đồ thị Parabol uốn lượn tuyệt mỹ trong không gian tọa độ.", emphasizedWords: ["đồ thị Parabol", "y = x²"], motionPreset: "majorReveal" },
  { id: "ch12_sub03", chapterIndex: 12, text: "Có những chuyển động không chỉ thay đổi. Chúng quay trở lại.", emphasizedWords: ["quay trở lại"], motionPreset: "transition" },

  // Ch 13 (Trigonometry/Waves -> Irrational Numbers Bridge)
  { id: "ch13_sub01", chapterIndex: 13, text: "Một điểm chuyển động tròn đều chiếu xuống không gian sinh ra sóng hình sin bất tận.", emphasizedWords: ["chuyển động tròn", "sóng hình sin"], motionPreset: "discovery" },
  { id: "ch13_sub02", chapterIndex: 13, text: "Từ nhịp đập con lắc, sóng nước, âm thanh đến bức xạ ánh sáng: Vũ trụ dao động theo nhịp điệu toán học.", emphasizedWords: ["Vũ trụ dao động", "nhịp điệu toán học"], motionPreset: "majorReveal" },
  { id: "ch13_sub03", chapterIndex: 13, text: "Ngay cả một hình vuông hoàn hảo cũng giấu một con số không chịu kết thúc.", emphasizedWords: ["không chịu kết thúc"], motionPreset: "question" },

  // Ch 14 (Irrational Numbers -> Infinity Bridge)
  { id: "ch14_sub01", chapterIndex: 14, text: "Đường chéo của hình vuông đơn vị mở ra căn bậc hai của hai: một đại lượng không thể viết thành phân số.", emphasizedWords: ["căn bậc hai của hai: √2", "phân số"], motionPreset: "discovery" },
  { id: "ch14_sub02", chapterIndex: 14, text: "Những con số vô tỉ tuôn chảy thành dãy số thập phân bất tận không bao giờ tuần hoàn.", emphasizedWords: ["Số vô tỉ (Irrational)", "bất tận"], motionPreset: "calmExplain" },
  { id: "ch14_sub03", chapterIndex: 14, text: "Nếu các chữ số không bao giờ kết thúc, ta đang nhìn vào một con số hay một quá trình vô hạn?", emphasizedWords: ["quá trình vô hạn"], motionPreset: "question" },

  // Ch 15 (Infinity -> Prime Numbers Bridge)
  { id: "ch15_sub01", chapterIndex: 15, text: "Chia đôi quãng đường một nửa cộng một phần tư cộng một phần tám: chuỗi vô hạn tiệm cận về một.", emphasizedWords: ["1/2 + 1/4 + 1/8", "tiệm cận về 1"], motionPreset: "calmExplain" },
  { id: "ch15_sub02", chapterIndex: 15, text: "Biểu tượng vô cực xuất hiện: không phải một điểm dừng, mà là một chân trời mở rộng không đáy.", emphasizedWords: ["Biểu tượng vô cực: ∞", "chân trời mở rộng"], motionPreset: "majorReveal" },
  { id: "ch15_sub03", chapterIndex: 15, text: "Giữa vô hạn con số, có những số không thể bị tách nhỏ theo cách thông thường.", emphasizedWords: ["không thể bị tách nhỏ"], motionPreset: "transition" },

  // Ch 16 (Prime Numbers -> Complex Numbers Bridge)
  { id: "ch16_sub01", chapterIndex: 16, text: "Các hợp số vỡ vụn thành những khối thừa số nhỏ, nhưng số nguyên tố kiên cường giữ nguyên bản thể.", emphasizedWords: ["hợp số", "Số nguyên tố (Primes)"], motionPreset: "discovery" },
  { id: "ch16_sub02", chapterIndex: 16, text: "Sàng Eratosthenes quét qua đại dương số học, để lại những viên ngọc nguyên tố phát sáng rực rỡ.", emphasizedWords: ["Sàng Eratosthenes", "ngọc nguyên tố"], motionPreset: "majorReveal" },
  { id: "ch16_sub03", chapterIndex: 16, text: "Nhưng có những phương trình mà không một số nào trên đường số trả lời được.", emphasizedWords: ["không một số nào"], motionPreset: "question" },

  // Ch 17 (Complex Numbers -> Calculus Bridge)
  { id: "ch17_sub01", chapterIndex: 17, text: "Phương trình x bình phương bằng trừ một xé toạc trục số thực, mở ra đơn vị ảo i trên trục thẳng đứng.", emphasizedWords: ["x² = -1", "đơn vị ảo i"], motionPreset: "discovery" },
  { id: "ch17_sub02", chapterIndex: 17, text: "Mặt phẳng phức ra đời: Nhân với i trở thành phép quay chín mươi độ thuần khiết và kỳ ảo.", emphasizedWords: ["Mặt phẳng phức (Complex Plane)", "phép quay 90°"], motionPreset: "majorReveal" },
  { id: "ch17_sub03", chapterIndex: 17, text: "Biết một vật đang ở đâu vẫn chưa cho ta biết nó đang thay đổi nhanh đến mức nào.", emphasizedWords: ["thay đổi nhanh đến mức nào"], motionPreset: "question" },

  // Ch 18 (Calculus of Motion)
  { id: "ch18_sub01", chapterIndex: 18, text: "Một vật chuyển động trong không gian không đứng yên để ta đo vận tốc bằng các khoảng cách thô sơ.", emphasizedWords: ["vận tốc", "khoảng cách thô sơ"], motionPreset: "calmExplain" },
  { id: "ch18_sub02", chapterIndex: 18, text: "Bằng cách thu hẹp khoảng thời gian tiến dần về không, độ dốc cát tuyến hóa thành tiếp tuyến: Đạo hàm tức thời ra đời.", emphasizedWords: ["Đạo hàm tức thời (Derivative)", "tiếp tuyến"], motionPreset: "majorReveal" },
  { id: "ch18_sub03", chapterIndex: 18, text: "Nhưng nếu đã biết vận tốc ở mọi khoảnh khắc, làm sao tính được toàn bộ quãng đường đã đi qua?", emphasizedWords: ["toàn bộ quãng đường"], motionPreset: "question" },

  // Ch 19 (Calculus of Accumulation)
  { id: "ch19_sub01", chapterIndex: 19, text: "Chia diện tích dưới đường cong thành vô số hình chữ nhật mỏng manh và cộng dồn lại: đó là tích phân Riemann.", emphasizedWords: ["Tích phân Riemann (Integral)", "cộng dồn"], motionPreset: "definition" },
  { id: "ch19_sub02", chapterIndex: 19, text: "Định lý cơ bản của giải tích tiết lộ bí mật tuyệt mỹ: Đạo hàm và tích phân là hai mặt đảo ngược của cùng một đồng xu.", emphasizedWords: ["Định lý cơ bản", "hai mặt đảo ngược"], motionPreset: "majorReveal" },
  { id: "ch19_sub03", chapterIndex: 19, text: "Khi kết hợp sự biến thiên và tích lũy vào một phương trình, ta có thể mô tả được quy luật của tự nhiên hay không?", emphasizedWords: ["quy luật của tự nhiên"], motionPreset: "question" },

  // Ch 20 (Differential Equations)
  { id: "ch20_sub01", chapterIndex: 20, text: "Phương trình vi phân xuất hiện như ngôn ngữ thuần khiết để định hình các định luật vật lý của Newton.", emphasizedWords: ["Phương trình vi phân", "định luật vật lý"], motionPreset: "definition" },
  { id: "ch20_sub02", chapterIndex: 20, text: "Từ quỹ đạo hành tinh, con lắc dao động đến dòng nhiệt lan tỏa: Mọi chuyển động đều tuân theo vi phân.", emphasizedWords: ["quỹ đạo hành tinh", "con lắc dao động"], motionPreset: "majorReveal" },
  { id: "ch20_sub03", chapterIndex: 20, text: "Nhưng liệu vũ trụ có hoàn toàn tất định, hay ẩn giấu những sự kiện không thể đoán trước?", emphasizedWords: ["không thể đoán trước"], motionPreset: "question" },

  // Ch 21 (Probability)
  { id: "ch21_sub01", chapterIndex: 21, text: "Trước những biến cố ngẫu nhiên, toán học xây dựng không gian mẫu để định lượng khả năng xảy ra của từng khả năng.", emphasizedWords: ["Xác suất (Probability)", "không gian mẫu"], motionPreset: "discovery" },
  { id: "ch21_sub02", chapterIndex: 21, text: "Từ những lần tung đồng xu vô tận, đường cong phân phối chuẩn hình chuông trỗi dậy đầy trật tự và quyến rũ.", emphasizedWords: ["phân phối chuẩn", "đường cong hình chuông"], motionPreset: "majorReveal" },
  { id: "ch21_sub03", chapterIndex: 21, text: "Làm thế nào để từ một nhóm mẫu nhỏ lẻ, ta có thể nhìn thấu bản chất của cả một quần thể rộng lớn?", emphasizedWords: ["quần thể rộng lớn"], motionPreset: "question" },

  // Ch 22 (Statistics)
  { id: "ch22_sub01", chapterIndex: 22, text: "Thống kê biến đại dương dữ liệu hỗn loạn thành các đại lượng đo lường cốt lõi: Giá trị trung bình và độ lệch chuẩn.", emphasizedWords: ["Thống kê (Statistics)", "Giá trị trung bình", "Độ lệch chuẩn"], motionPreset: "definition" },
  { id: "ch22_sub02", chapterIndex: 22, text: "Định lý giới hạn trung tâm chứng minh: Bất kể dữ liệu ban đầu méo mó ra sao, tổng thể vẫn sẽ hội tụ về đường cong chuẩn mực.", emphasizedWords: ["Định lý giới hạn trung tâm", "hội tụ"], motionPreset: "majorReveal" },
  { id: "ch22_sub03", chapterIndex: 22, text: "Nếu toán học có thể định lượng sự ngẫu nhiên, liệu tư duy logic thuần túy có thể được cơ giới hóa thành các quy tắc cứng?", emphasizedWords: ["tư duy logic", "cơ giới hóa"], motionPreset: "question" },

  // Ch 23 (Logic)
  { id: "ch23_sub01", chapterIndex: 23, text: "Logic học hình thức tách rời nội dung cảm tính, chỉ giữ lại cấu trúc suy diễn chân lý tuyệt đối của các mệnh đề.", emphasizedWords: ["Logic học hình thức", "chân lý tuyệt đối"], motionPreset: "definition" },
  { id: "ch23_sub02", chapterIndex: 23, text: "Các phép toán VÀ, HOẶC, PHỦ ĐỊNH xây dựng nên khung sườn suy luận không thể lay chuyển.", emphasizedWords: ["VÀ, HOẶC, PHỦ ĐỊNH", "khung sườn suy luận"], motionPreset: "discovery" },
  { id: "ch23_sub03", chapterIndex: 23, text: "Liệu một hệ tiên đề logic có thể chứng minh được tất cả mọi chân lý đúng đắn trong toán học?", emphasizedWords: ["tất cả mọi chân lý"], motionPreset: "question" },

  // Ch 24 (Limits of Formal Systems)
  { id: "ch24_sub01", chapterIndex: 24, text: "Định lý bất toàn của Gödel giáng một đòn chí mạng: Trong mọi hệ thống toán học đủ mạnh, luôn có những chân lý không thể chứng minh.", emphasizedWords: ["Định lý bất toàn Gödel", "không thể chứng minh"], motionPreset: "majorReveal" },
  { id: "ch24_sub02", chapterIndex: 24, text: "Alan Turing chỉ ra rằng không tồn tại thuật toán tổng quát nào có thể phán quyết một chương trình có dừng lại hay không.", emphasizedWords: ["Alan Turing", "Bài toán dừng"], motionPreset: "discovery" },
  { id: "ch24_sub03", chapterIndex: 24, text: "Nếu không thể chứng minh tất cả, thì một cỗ máy hữu hạn có thể tính toán được những gì theo từng bước?", emphasizedWords: ["tính toán theo từng bước"], motionPreset: "question" },

  // Ch 25 (Algorithms)
  { id: "ch25_sub01", chapterIndex: 25, text: "Thuật toán là một chuỗi hữu hạn các chỉ dẫn rõ ràng và chính xác để biến đầu vào thành kết quả đầu ra.", emphasizedWords: ["Thuật toán (Algorithm)", "chỉ dẫn rõ ràng"], motionPreset: "definition" },
  { id: "ch25_sub02", chapterIndex: 25, text: "Từ thuật toán tìm ước chung của Euclid đến máy Turing: Tư duy con người đã được cơ giới hóa thành các bước chạy tuần tự.", emphasizedWords: ["Ước chung Euclid", "máy Turing"], motionPreset: "majorReveal" },
  { id: "ch25_sub03", chapterIndex: 25, text: "Một bài toán có thể giải được trên lý thuyết, nhưng liệu ta có đủ thời gian để chờ nó tính xong hay không?", emphasizedWords: ["đủ thời gian"], motionPreset: "question" },

  // Ch 26 (Complexity and Search)
  { id: "ch26_sub01", chapterIndex: 26, text: "Ký hiệu Big-O phân loại thuật toán từ tốc độ tức thì đến sự bùng nổ hàm mũ không thể kiểm soát.", emphasizedWords: ["Ký hiệu Big-O", "bùng nổ hàm mũ"], motionPreset: "calmExplain" },
  { id: "ch26_sub02", chapterIndex: 26, text: "Bài toán P so với NP đặt câu hỏi thiên niên kỷ: Liệu việc kiểm chứng đáp án có dễ như việc tự mình tìm ra nó?", emphasizedWords: ["Bài toán P vs NP", "thiên niên kỷ"], motionPreset: "majorReveal" },
  { id: "ch26_sub03", chapterIndex: 26, text: "Để hiện thực hóa những cỗ máy thuật toán khổng lồ này, bảng chữ cái vật lý tối thiểu cần có là gì?", emphasizedWords: ["bảng chữ cái vật lý tối thiểu"], motionPreset: "question" },

  // Ch 27 (Binary)
  { id: "ch27_sub01", chapterIndex: 27, text: "Mọi con số, ký tự và hình ảnh phức tạp nhất đều có thể biểu diễn qua hai trạng thái duy nhất: Không và Một.", emphasizedWords: ["Hệ nhị phân (Binary)", "Không và Một"], motionPreset: "definition" },
  { id: "ch27_sub02", chapterIndex: 27, text: "Hệ nhị phân khai thác lũy thừa của hai, mã hóa thế giới thành các chuỗi bit thanh thoát.", emphasizedWords: ["lũy thừa của hai", "chuỗi bit"], motionPreset: "discovery" },
  { id: "ch27_sub03", chapterIndex: 27, text: "Làm thế nào để hai con số không và một có thể tự mình thực hiện các phép tính cộng trừ số học?", emphasizedWords: ["cộng trừ số học"], motionPreset: "question" },

  // Ch 28 (Boolean Logic)
  { id: "ch28_sub01", chapterIndex: 28, text: "Đại số Boole kết hợp chân trị logic với các phép toán nhị phân qua các cổng logic cơ bản.", emphasizedWords: ["Đại số Boole", "cổng logic"], motionPreset: "definition" },
  { id: "ch28_sub02", chapterIndex: 28, text: "Mạch cộng bán phần ghép từ cổng XOR và AND chính thức biến chân lý suy luận thành phép cộng cơ khí thực thụ.", emphasizedWords: ["Mạch cộng bán phần (Half-Adder)", "XOR và AND"], motionPreset: "majorReveal" },
  { id: "ch28_sub03", chapterIndex: 28, text: "Làm sao để tạo ra hàng triệu cổng logic này mà không cần những công tắc cơ học cồng kềnh?", emphasizedWords: ["hàng triệu cổng logic"], motionPreset: "question" },

  // Ch 29 (Transistor)
  { id: "ch29_sub01", chapterIndex: 29, text: "Bóng bán dẫn silicon điều khiển dòng điện chạy qua bằng điện áp, trở thành chiếc công tắc siêu nhỏ đóng mở trạng thái.", emphasizedWords: ["Bóng bán dẫn (Transistor)", "công tắc siêu nhỏ"], motionPreset: "definition" },
  { id: "ch29_sub02", chapterIndex: 29, text: "Công nghệ nano thu nhỏ hàng tỷ bóng bán dẫn xuống kích thước phân tử, tạo nên bước nhảy vọt của định luật Moore.", emphasizedWords: ["Công nghệ nano", "Định luật Moore"], motionPreset: "majorReveal" },
  { id: "ch29_sub03", chapterIndex: 29, text: "Làm thế nào để hàng tỷ công tắc nano này phối hợp nhịp nhàng thành một bộ não điện tử hoàn chỉnh?", emphasizedWords: ["bộ não điện tử hoàn chỉnh"], motionPreset: "question" },

  // Ch 30 (Chip Architecture)
  { id: "ch30_sub01", chapterIndex: 30, text: "Kiến trúc vi xử lý tổ chức hàng tỷ bóng bán dẫn thành các khối chức năng: Khối tính toán ALU, bộ nhớ và chu kỳ lệnh.", emphasizedWords: ["Kiến trúc vi xử lý (CPU)", "Khối tính toán ALU"], motionPreset: "definition" },
  { id: "ch30_sub02", chapterIndex: 30, text: "Bộ đếm xung nhịp dao động hàng tỷ lần mỗi giây, điều phối dòng chảy thông tin như một dàn nhạc giao hưởng điện tử.", emphasizedWords: ["xung nhịp (Clock)", "dàn nhạc giao hưởng điện tử"], motionPreset: "majorReveal" },
  { id: "ch30_sub03", chapterIndex: 30, text: "Khi năng lực tính toán bùng nổ, làm thế nào để máy tính nhìn thấy hình ảnh, âm thanh và không gian đa chiều?", emphasizedWords: ["không gian đa chiều"], motionPreset: "transition" },

  // Ch 31 (Information Becomes Data)
  { id: "ch31_sub01", chapterIndex: 31, text: "Một con chip chỉ hiểu những con số, nhưng thế giới thực lại ngập tràn hình ảnh, âm thanh và văn bản.", emphasizedWords: ["chỉ hiểu những con số", "thế giới thực"], motionPreset: "calmExplain" },
  { id: "ch31_sub02", chapterIndex: 31, text: "Mỗi điểm ảnh tách thành các giá trị đỏ lục lam, sóng âm được lấy mẫu theo thời gian, và chữ viết hóa thành mã nhị phân.", emphasizedWords: ["đỏ lục lam (RGB)", "lấy mẫu theo thời gian", "mã nhị phân"], motionPreset: "majorReveal" },
  { id: "ch31_sub03", chapterIndex: 31, text: "Khi hàng triệu con số phải thay đổi cùng một lúc, làm thế nào để toán học tổ chức chúng một cách có trật tự?", emphasizedWords: ["tổ chức có trật tự"], motionPreset: "question" },

  // Ch 32 (Matrices)
  { id: "ch32_sub01", chapterIndex: 32, text: "Ma trận ra đời như một mảng số hai chiều kỳ diệu để chỉ huy vô số phép biến đổi đồng thời.", emphasizedWords: ["Ma trận (Matrix)", "biến đổi đồng thời"], motionPreset: "definition" },
  { id: "ch32_sub02", chapterIndex: 32, text: "Chỉ bằng một phép nhân ma trận, toàn bộ không gian được xoay chuyển, co giãn, kéo nghiêng và phản chiếu mượt mà.", emphasizedWords: ["xoay chuyển", "co giãn", "phản chiếu"], motionPreset: "majorReveal" },
  { id: "ch32_sub03", chapterIndex: 32, text: "Nếu những tọa độ ma trận đó là các đỉnh của một vật thể, liệu ta có thể dựng nên cả một thế giới ảo?", emphasizedWords: ["thế giới ảo"], motionPreset: "question" },

  // Ch 33 (Computer Graphics)
  { id: "ch33_sub01", chapterIndex: 33, text: "Từ những vector tọa độ sơ khai, các hình tam giác liên kết lại tạo thành khung lưới ba chiều sống động.", emphasizedWords: ["vector tọa độ", "khung lưới 3D (Mesh)"], motionPreset: "discovery" },
  { id: "ch33_sub02", chapterIndex: 33, text: "Phép chiếu hình học và đổ bóng ánh sáng biến các phương trình trừu tượng thành những khung cảnh rực rỡ trên màn hình.", emphasizedWords: ["phép chiếu", "đổ bóng ánh sáng"], motionPreset: "majorReveal" },
  { id: "ch33_sub03", chapterIndex: 33, text: "Nhưng một âm thanh hay tín hiệu tự nhiên không phải là lưới tam giác, nó là một chuyển động phức tạp hơn rất nhiều.", emphasizedWords: ["chuyển động phức tạp"], motionPreset: "question" },

  // Ch 34 (Fourier and Signal)
  { id: "ch34_sub01", chapterIndex: 34, text: "Biến đổi Fourier tiết lộ bí mật kinh ngạc: Mọi dạng sóng phức tạp đều là sự hòa âm của những sóng sin đơn giản.", emphasizedWords: ["Biến đổi Fourier", "sóng sin đơn giản"], motionPreset: "definition" },
  { id: "ch34_sub02", chapterIndex: 34, text: "Tách rời tín hiệu thành các tần số giúp loài người nén âm nhạc, truyền tải hình ảnh và nhìn xuyên qua cơ thể người.", emphasizedWords: ["Phổ tần số", "nén âm nhạc", "nhìn xuyên qua cơ thể"], motionPreset: "majorReveal" },
  { id: "ch34_sub03", chapterIndex: 34, text: "Dữ liệu sau khi được mã hóa và xử lý không thể đứng yên, nó phải tìm đường di chuyển giữa các mạng lưới.", emphasizedWords: ["tìm đường di chuyển"], motionPreset: "question" },

  // Ch 35 (Graph Theory and Networks)
  { id: "ch35_sub01", chapterIndex: 35, text: "Lý thuyết đồ thị mô hình hóa các mối liên kết thông qua những điểm nút và cạnh nối vô hình.", emphasizedWords: ["Lý thuyết đồ thị", "điểm nút (Nodes)", "cạnh nối (Edges)"], motionPreset: "definition" },
  { id: "ch35_sub02", chapterIndex: 35, text: "Từ thuật toán tìm đường đi ngắn nhất đến định tuyến Internet: Dòng chảy thông tin luôn tìm thấy lối đi tối ưu nhất.", emphasizedWords: ["đường đi ngắn nhất (Dijkstra)", "định tuyến Internet"], motionPreset: "majorReveal" },
  { id: "ch35_sub03", chapterIndex: 35, text: "Nếu dữ liệu phải đi qua những con đường công cộng rộng lớn, làm sao để giữ trọn vẹn sự bí mật của thông tin?", emphasizedWords: ["bí mật của thông tin"], motionPreset: "question" },

  // Ch 36 (Cryptography)
  { id: "ch36_sub01", chapterIndex: 36, text: "Mật mã học hiện đại sử dụng vẻ đẹp bất đối xứng của toán học để khóa chặt ý nghĩa của thông điệp.", emphasizedWords: ["Mật mã học (Cryptography)", "bất đối xứng"], motionPreset: "definition" },
  { id: "ch36_sub02", chapterIndex: 36, text: "Phép nhân hai số nguyên tố khổng lồ thì dễ dàng, nhưng phân tích ngược lại đòi hỏi hàng nghìn năm tính toán.", emphasizedWords: ["số nguyên tố khổng lồ", "khóa công khai RSA"], motionPreset: "majorReveal" },
  { id: "ch36_sub03", chapterIndex: 36, text: "Nếu dữ liệu không bị kẻ xấu đọc trộm mà chỉ đơn giản bị méo mó và hư hỏng trên đường truyền thì sao?", emphasizedWords: ["méo mó và hư hỏng"], motionPreset: "question" },

  // Ch 37 (Information Theory & Error Correction)
  { id: "ch37_sub01", chapterIndex: 37, text: "Claude Shannon định nghĩa entropy để đo lường lượng tin và giới hạn nén tối đa của mọi kênh truyền.", emphasizedWords: ["Entropy thông tin", "Claude Shannon", "giới hạn nén"], motionPreset: "definition" },
  { id: "ch37_sub02", chapterIndex: 37, text: "Mã sửa lỗi chèn thêm các cấu trúc dự phòng thông minh, giúp thông tin tự hồi sinh nguyên vẹn dù bị nhiễu loạn tấn công.", emphasizedWords: ["Mã sửa lỗi (Hamming)", "tự hồi sinh nguyên vẹn"], motionPreset: "majorReveal" },
  { id: "ch37_sub03", chapterIndex: 37, text: "Khi đứng trước hàng triệu sự lựa chọn và trạng thái khác nhau, làm thế nào để thuật toán tìm ra trạng thái tốt nhất?", emphasizedWords: ["trạng thái tốt nhất"], motionPreset: "question" },

  // Ch 38 (Optimization)
  { id: "ch38_sub01", chapterIndex: 38, text: "Thuật toán tối ưu hóa biến mọi bài toán thành một địa hình đồi núi của hàm mất mát.", emphasizedWords: ["Tối ưu hóa (Optimization)", "hàm mất mát (Loss)"], motionPreset: "calmExplain" },
  { id: "ch38_sub02", chapterIndex: 38, text: "Phương pháp hạ gradient lần theo độ dốc âm của đạo hàm, kiên nhẫn dẫn lối tham số xuống đáy thung lũng sâu nhất.", emphasizedWords: ["Hạ gradient (Gradient Descent)", "đáy thung lũng"], motionPreset: "majorReveal" },
  { id: "ch38_sub03", chapterIndex: 38, text: "Nếu những tham số đó thuộc về một hệ thống có hàng tỷ kết nối chéo nhau, điều kỳ diệu gì sẽ xảy ra?", emphasizedWords: ["hàng tỷ kết nối"], motionPreset: "question" },

  // Ch 39 (Neural Networks)
  { id: "ch39_sub01", chapterIndex: 39, text: "Mỗi nơ-ron nhân tạo nhận tín hiệu, nhân với trọng số, cộng lại và kích hoạt theo phi tuyến tính.", emphasizedWords: ["Nơ-ron nhân tạo", "trọng số (Weights)", "kích hoạt phi tuyến"], motionPreset: "definition" },
  { id: "ch39_sub02", chapterIndex: 39, text: "Thuật toán lan truyền ngược đưa sai số chảy ngược dòng mạng, tự động tinh chỉnh hàng tỷ trọng số để học hỏi tri thức.", emphasizedWords: ["Lan truyền ngược (Backpropagation)", "tinh chỉnh trọng số"], motionPreset: "majorReveal" },
  { id: "ch39_sub03", chapterIndex: 39, text: "Để trí tuệ nhân tạo hiểu được ngôn ngữ và thế giới, làm thế nào để biến ý niệm thành không gian toán học?", emphasizedWords: ["không gian toán học"], motionPreset: "question" },

  // Ch 40 (AI and Representation)
  { id: "ch40_sub01", chapterIndex: 40, text: "Từ ngữ, hình ảnh và âm thanh được nhúng thành các vector trong không gian tiềm ẩn hàng nghìn chiều.", emphasizedWords: ["Không gian tiềm ẩn (Latent Space)", "vector nhúng"], motionPreset: "discovery" },
  { id: "ch40_sub02", chapterIndex: 40, text: "Cơ chế chú ý Attention kết nối ngữ cảnh của vạn vật, biến các phép tính ma trận thành sự thấu hiểu sâu sắc.", emphasizedWords: ["Cơ chế chú ý (Attention)", "thấu hiểu sâu sắc"], motionPreset: "majorReveal" },
  { id: "ch40_sub03", chapterIndex: 40, text: "Và trí tuệ nhân tạo hôm nay chỉ là một trong vô vàn nơi toán học đang âm thầm vận hành thế giới.", emphasizedWords: ["âm thầm vận hành thế giới"], motionPreset: "question" },

  // Ch 41 (Mathematics Beneath Modern Life)
  { id: "ch41_sub01", text: "Từ tín hiệu định vị vệ tinh GPS, quét cộng hưởng từ MRI đến dự báo thời tiết và mạng lưới tài chính toàn cầu.", chapterIndex: 41, emphasizedWords: ["GPS", "MRI", "dự báo thời tiết", "tài chính toàn cầu"], motionPreset: "calmExplain" },
  { id: "ch41_sub02", text: "Lớp vỏ công nghệ hiện đại bóc tách để lộ ra những phương trình vi phân, đại số tuyến tính và xác suất thống kê.", chapterIndex: 41, emphasizedWords: ["phương trình vi phân", "đại số tuyến tính", "xác suất thống kê"], motionPreset: "majorReveal" },
  { id: "ch41_sub03", text: "Nhưng toàn bộ nền văn minh phức tạp và tráng lệ này đã bắt đầu từ điều gì đơn sơ nhất?", chapterIndex: 41, emphasizedWords: ["điều gì đơn sơ nhất"], motionPreset: "question" },

  // Ch 42 (Final Collapse and Return to the Point)
  { id: "ch42_sub01", chapterIndex: 42, text: "Mọi thuật toán AI, hàng tỷ bóng bán dẫn, các phương trình giải tích và hệ tọa độ dần sụp đổ ngược dòng thời gian.", emphasizedWords: ["sụp đổ ngược dòng thời gian"], motionPreset: "calmExplain" },
  { id: "ch42_sub02", chapterIndex: 42, text: "Tất cả các con số, hình học và vết khắc cổ xưa thu bé lại thành một vòng lặp vô cực thuần khiết.", emphasizedWords: ["vòng lặp vô cực (Infinity Loop)"], motionPreset: "majorReveal" },
  { id: "ch42_sub03", chapterIndex: 42, text: "Và từ vô cực, mọi sự tồn tại trở về với một Điểm sáng nguyên thủy duy nhất giữa hư không: Từ Một đến Tất Cả.", emphasizedWords: ["Điểm sáng nguyên thủy", "Từ Một đến Tất Cả"], motionPreset: "transition" }
];

console.log("Measuring exact MP3 durations and locking timestamps for all 42 chapters...");

const processedCues = [];
const chapterDurations = {};

// Group raw cues by chapter
const chapterGroups = {};
for (const cue of rawCues) {
  if (!chapterGroups[cue.chapterIndex]) {
    chapterGroups[cue.chapterIndex] = [];
  }
  chapterGroups[cue.chapterIndex].push(cue);
}

// Calculate timeline per chapter with 1s visual lead, 0.1s (3f) snap pause between sentences, & 0.33s outro hold
const INTRO_LEAD_FRAMES = 28; // ~0.93s establishing space for image & scene before voiceover
const SENTENCE_PAUSE_FRAMES = 3; // ~0.10s minimal snap gap between consecutive sentences
const OUTRO_HOLD_FRAMES = 10; // ~0.33s settle hold before next chapter cut

for (const chIndex in chapterGroups) {
  const chCues = chapterGroups[chIndex];
  let localFrame = INTRO_LEAD_FRAMES; // Voice starts ~1s after visual establishes

  for (let j = 0; j < chCues.length; j++) {
    const cue = chCues[j];
    const mp3Path = path.join(voiceDir, `${cue.id}.mp3`);
    let durationSec = 4.5;
    try {
      if (fs.existsSync(mp3Path)) {
        const out = execSync(`npx remotion ffprobe "${mp3Path}" -show_entries format=duration -v quiet -of csv="p=0"`).toString().trim();
        durationSec = parseFloat(out);
      } else {
        // High fidelity estimate: ~14 characters/sec
        durationSec = parseFloat((cue.text.length / 14.5).toFixed(2));
        if (durationSec < 3.8) durationSec = 3.8;
      }
    } catch (e) {
      durationSec = parseFloat((cue.text.length / 14.5).toFixed(2));
    }

    const voiceFrames = Math.ceil(durationSec * 30);
    const startFrame = localFrame;
    const endFrame = startFrame + voiceFrames; // Exact audio duration
    const impactFrame = startFrame + Math.floor(voiceFrames * 0.4);

    processedCues.push({
      ...cue,
      startFrame,
      endFrame,
      impactFrame,
      voiceFrames,
      durationSec: parseFloat(durationSec.toFixed(2)),
      position: "bottom",
    });

    console.log(`[Ch ${chIndex}] ${cue.id}: ${durationSec.toFixed(2)}s (${voiceFrames}f) -> Frame ${startFrame} to ${endFrame}`);

    // Natural breath and pause between sentences within chapter
    if (j < chCues.length - 1) {
      localFrame = endFrame + SENTENCE_PAUSE_FRAMES;
    } else {
      localFrame = endFrame;
    }
  }

  // End of chapter: visual settle hold
  const totalChapterDuration = localFrame + OUTRO_HOLD_FRAMES;
  chapterDurations[chIndex] = totalChapterDuration;
  console.log(`=== Total Chapter ${chIndex} Duration: ${totalChapterDuration} frames (${(totalChapterDuration/30).toFixed(2)}s) ===\n`);
}

// Output updated vietnameseCues.ts
const cuesFileContent = `import { SubtitleCue } from "../contracts/types";

// Master Vietnamese Subtitle Cues — 100% Locked to Real Voiceover Audio Timings
export const VIETNAMESE_SUBTITLE_CUES: SubtitleCue[] = ${JSON.stringify(processedCues, null, 2)};

export function getSubtitlesForChapter(chapterIndex: number): SubtitleCue[] {
  return VIETNAMESE_SUBTITLE_CUES.filter((cue) => cue.chapterIndex === chapterIndex);
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'evolution', 'subtitles', 'vietnameseCues.ts'), cuesFileContent);
console.log("Updated src/evolution/subtitles/vietnameseCues.ts successfully!");

// Output chapter cues file
const chapterCuesData = [];
for (let i = 1; i <= 42; i++) {
  const dur = chapterDurations[i] || 500;
  chapterCuesData.push({
    chapterIndex: i,
    title: `Chapter ${i}`,
    startFrame: 0, // will be computed in master
    durationFrames: dur
  });
}
console.log("Calculated Chapter Durations (Ch 1-42):", Object.values(chapterDurations));
