Set Speech = CreateObject("SAPI.SpVoice")
Set Stream = CreateObject("SAPI.SpFileStream")
Stream.Open "public\voiceover.wav", 3, False
Set Speech.AudioOutputStream = Stream
Speech.Speak "Dung lai! Dung viet if else long nhau nua. Hay su dung guard clause de code sach se va chuyen nghiep hon. Bam follow de hoc them meo lap trinh!"
Stream.Close
WScript.Echo "Voiceover WAV created successfully!"
