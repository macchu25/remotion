Set Speech = CreateObject("SAPI.SpVoice")
Set Stream = CreateObject("SAPI.SpFileStream")
Stream.Open "public\derivative_masterclass_voice.wav", 3, False
Set Speech.AudioOutputStream = Stream

Speech.Speak "Xin chao cac ban! Hom nay chung ta se cung nhau giai ma mot trong nhung khai niem quan trong nhat cua toan hoc, do chinh la Dao Ham. Rat nhieu ban hoc sinh thuong cam thay dao ham rat kho vi toan la cong thuc phuc tap. Nhung dung lo! Trong video nay, chung ta se hieu ban chat cua dao ham mot cach thu vi va de hieu nhat tu con so zero!"

Speech.Speak "Chuong mot: Tu cau hoi trong doi song. Hay tuong tuong ban dang lai xe may tu Ha Noi den Hai Phong. Quang duong dai 100 kilomet va ban di het 2 gio. Lay 100 chia cho 2, ban tinh ra van toc trung binh la 50 kilomet tren gio. Nhung co phai luc nao ban cung di dung 50 kilomet tren gio khong? Khong he! Co luc ban dung lai cho den do, co luc ban tang toc vuot xe khac. Khi canh sat giao thong ban toc do o phut thu 30 va thong bao ban dang di 75 kilomet tren gio, do chinh la van toc tuc thoi tai dung thoi diem do! Vay lam sao toan hoc tinh duoc van toc tai dung mot khoanh khac khi thoi gian bang 0?"

Speech.Speak "Chuong hai: Y nghia hinh hoc va duong tiep tuyen. Tren do thi toan hoc, van toc trung binh chinh la do doc cua duong cat tuyen noi hai diem A va B. Khi chung ta thu hep khoang thoi gian Delta T ngay cang nho, tu 10 giay, xuong 1 giay, roi 0 phay 001 giay, diem B se truat dan ve phia diem A. Luc nay, duong cat tuyen se bien thanh duong tiep tuyen suot qua dung mot diem tren do thi! Do doc cua duong tiep tuyen do chinh la dao ham!"

Speech.Speak "Chuong ba: Gia ma cong thuc gioi han. Cong thuc dao ham F phay cua X bang gioi han Lim khi Delta X tien ve 0 cua Delta Y chia cho Delta X. Nghe co ve phuc tap, nhung ban chat cua no cuc ky don gian. Delta Y la su thay doi cua dau ra, Delta X la su thay doi cua dau vao. Dao ham don gian la ty le thay doi tuc thoi khi Delta X sieu nho!"

Speech.Speak "Chuong bon: Ung dung trong thuc te. Dao ham xuat hien o khap moi noi! Trong vat ly, dao ham cua quang duong la van toc, dao ham cua van toc la gia toc. Trong kinh te, dao ham giup tinh chi phi bien de toi uu hoa loi nhuan. Va dac biet trong Tri tue nhan tao AI, thuat toan Gradient Descent dung dao ham de giup AI hoc va sua loi! Hy vong qua video nay, ban da hieu ro ban chat cua dao ham. Cam on cac ban da theo doi!"

Stream.Close
WScript.Echo "Masterclass Voiceover WAV created successfully!"
