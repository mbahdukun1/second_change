SERVER

Cloning file dari github dulu 
menggunakan link : https://github.com/mbahdukun1/second_change.git
1. download GIT di windows atau mac menggunakan brew install git
2. Open Terminal dan Change directory ke folder yang disimpan
3. gunakan command pada terminal "git clone (paste link github)" lalu tekan enter
4. buka file di vscode -> jalankan terminal di vscode lalu ketik "yarn install" untuk download depedencies
5. create file .env lalu ikutin intruksi dibawah



yang ada di env
-- Akses ke Databases : DATABASE_URL="mysql://root:@localhost:3306/second_change"
-- Akses port Server : PORT="3001"

Cara Jalanin Server :
 1. pada terminal ketik command "npx prisma migrate deploy" kalau tidak berhasil gunakan "npx prisma migrate dev" (karena db jalan di local)
 1. buka file package.json -> cari yang scripts -> dev
 2. untuk jalanin nya pakai command : yarn run dev


Frontend 

 1. Download file atau folder yang sudah dikirim
 2. open android studio download semua path yang diperlukan untuk jalan di local lalu create adv manager atau device manager untuk menjalankan simulator
 3. jika sudah jalan semua, jalankan atau klik icon play diatas untuk running aplikasi 


DATABASSE

1. Download Dbeaver
2. Create new connection lalu pilih menggunakan MYSQL
3. sebelum di finish klik "Test Conection" terlebih dahulu
4. lalu finish 
untuk tutorial setup ini nanti by zooms aja
