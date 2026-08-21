Set Speech = CreateObject("SAPI.SpVoice")
Set Stream = CreateObject("SAPI.SpFileStream")
Stream.Open "public\derivative_voice.wav", 3, False
Set Speech.AudioOutputStream = Stream
Speech.Speak "Xin chao tat ca cac ban! Hom nay chung ta se cung nhau kham pha ban chat cua Dao ham trong Toan hoc. Dao ham khong phai la cong thuc kho kho. Ban chat cua dao ham chinh la toc do thay doi tuc thoi cua mot ham so. Khi khoang cach Delta X tien dan ve 0, duong cat tuyen se tro thanh duong tiep tuyen tai mot diem. Do doc cua duong tiep tuyen do chinh la dao ham!"
Stream.Close
WScript.Echo "Derivative Voiceover created!"
