# Principles of Software Project

## เครื่องมือที่ใช้/แพลตฟอร์ม
1. React js
2. Express js
3. Node js
4. MySQL
5. Visual Studio code
6. Insomnia
7. Github
8. Spring boot
9. draw.io

## Project นี้เกี่ยวกับอะไร?
โปรเจกต์นี้เป็นส่วนหนึ่งของรายวิชา Principles of Software Design and Development โดยมีวัตถุประสงค์ให้นักศึกษาแบ่งกลุ่มเพื่อออกแบบและพัฒนาซอฟต์แวร์ตามหลักการของ SOLID และ CRUD โดยเน้นการใช้ RESTful API เป็นหลักในการเชื่อมต่อและจัดการข้อมูลระหว่างระบบ โดยจะส่งเสริมให้นักศึกษาได้
ทำการออก ER diagram, Class disgram และ Use Case Diagram ได้ด้วยตนเองเป็นและสามารถใช้งานได้จริงด้วย

## การดำเนินงาน
การกำหนดหัวข้อ: หัวข้อระบบซื้อขายภาพวาดภายในมหาวิทยาลัยขอนแก่น
Backend: ได้มีการเลือกเครื่องมือที่เหมาะสมสำหรับการออกแบบและพัฒนาระบบในรูปแบบ RESTful API และอ้างอิงตามหลักการของ SOLID 
จึงได้เลือกมาเป็น Express js ที่สามารถสร้าง RESTful API เพื่อส่งไปยังหน้าเว็บที่พัฒนาผ่าน React js ได้ก่อนภายหลังจะได้ปรับเปลี่ยนมาใช้ Spring boot ตามความต้องการของรายวิชาในภายหลัง
การออกแบบระบบ: 
* ER diagram: <img width="476" height="341" alt="image" src="https://github.com/user-attachments/assets/2feb9e79-9a78-47d1-bad1-d0ece467cfe0" />
* Class diagram: <img width="476" height="341" alt="image" src="https://github.com/user-attachments/assets/1ad4627e-c0d1-45f5-8d18-96f908ff1f60" />
* Use Case diagram: <img width="476" height="341" alt="image" src="https://github.com/user-attachments/assets/bbbed111-3535-47d7-9de7-79e0503f8bd9" />

เมื่อทำการออกแบบ diagram ครบหมดทุกอย่างแล้วจึงทำการสร้างฐานข้อมูลขึ้นโดยเลือกใช้เป็น MySQL เนื่องจากเป็นฐานข้อมูลที่ง่ายต่อการเก็บข้อมูลแบบ Relational Database และทำการออกแบบ RESTful API ให้สามารถทำงานร่วมได้ด้วยเช่นกัน
API test: เราจึงได้ใช้ Insomnia มาเพื่อใช้ในการทดสอบ API ว่าสามารถทำงานได้ตรงตามที่ต้องการหรือไม่และก็ทำการออกแบบหน้า UI ควบคู่ไปด้วย
UX/UI: เราเลือกใช้ framework อย่าง React js เนื่องจากเป็น framework ที่มึความง่ายในการเขียนและออกแบบหน้า UI ที่ง่ายและสวยงาม

## ปัญหาที่พบ
เนื่องจากมีการปรับเปลี่ยนตัวเครื่องมือที่ใช้ในการพัฒนาระบบในภายหลังอย่างกะหันทันในระบบของ Backend จาก Express js -> Spring boot ซึ่งทำให้จะต้องมีการปรับปรุงตัวของ RESTful API ใหม่และจะต้อง Request API ข้าม Origin จึงจะทำให้ React js สามารถทำงานได้กับ Spring boot และด้วยเหตุนี้เองจึงทำให้มีบางฟีเจอร์ที่ขาดหายไปหรือไม่ก็ไม่สามารถใช้งานได้
 
