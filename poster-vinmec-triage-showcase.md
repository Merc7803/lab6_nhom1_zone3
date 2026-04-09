# VINFAST AI ADVISOR - Goi y xe phu hop

Khach hang muon mua xe dien VinFast nhung kho chon model phu hop voi ngan sach va nhu cau.
Hien tai: tu tim thong tin roi rac, hoi showroom, mat nhieu thoi gian va de chon sai.
AI thu intake, goi y top 3 xe, tinh chi phi 5 nam va ho tro de lai lead.

## 1) Ten product + problem
- Product: VinFast AI Advisor (Compass)
- Problem statement (1 cau): Nguoi mua xe kho map nhu cau thuc te sang model phu hop, AI giup tu van nhanh bang top 3 de xuat grounded theo catalog.

## 2) Before | After

| BEFORE (hien tai) | AFTER (voi AI) |
|---|---|
| 1. Khach tu tim gia/thong so tren nhieu kenh | 1. Khach mo Compass chatbot |
| 2. Tu uoc luong kha nang tai chinh | 2. Nhap nhu cau: ngan sach, so nguoi, usage, km/thang, uu tien |
| 3. Hoi sale/showroom de loc model | 3. AI goi recommend tool va tra Top 3 xe + ly do |
| 4. Tu tinh chi phi tra gop va su dung | 4. Chon xe de xem calculator (tra gop + chi phi sac + tong 5 nam) |
| 5. Neu van mo ho thi cho tu van tiep | 5. Gui lead / dang ky lai thu trong app |
| Tong: ~7 buoc, 20-30 phut | Tong: ~4-5 buoc, ~5-8 phut |

## 3) Live demo

### Input demo
- Prompt: "Minh co 700 trieu, gia dinh 5 nguoi, di 1200 km/thang, uu tien rong rai"

### Ket qua AI (mock)
1. VF 6 Plus (match cao)
2. VF 5 Eco
3. VF 7 Premium

AI hien ly do de xuat + disclaimer gia + goi y buoc tiep theo (tinh chi phi, so sanh, dang ky lai thu).

- Screenshot UI: Home + Compass + Recommendations + Calculator
- Scan thu: [QR CODE]
- Link demo: demo.example.com

## 4) Impact

| Metric | Truoc | Sau | Thay doi |
|---|---:|---:|---:|
| Thoi gian pre-consult | 20-30 phut | 5-8 phut | giam ~70% |
| Budget-compliant goi y | khong on dinh | ~100% (co hard check) | tang ro ret |
| Ty le vao duoc shortlist 3 xe | thap | cao hon | tang |
| Cost per session | - | ~$0.01-0.02 | API + tool |

## 5) Failure modes | Learning signal

### Failure modes
1. User nhap ngan sach mo ho (vi du: "tam 1 ty hon") -> parser sai don vi.
   - Mitigation: hoi xac nhan lai budget theo trieu VND truoc khi recommend.
2. AI neu thong so khong co trong tool output (hallucination).
   - Mitigation: ep tool-first, chi duoc tra loi dua tren ket qua tool, fallback sang flow cau hoi co dinh.

### Learning signal
- User co chon xe nam trong Top 3 hay bo qua?
- User thuong chinh tham so nao trong calculator (down payment, tenure, lai suat)?
- User co de lai lead/test-drive sau khi xem de xuat khong?

Ket luan: Cang nhieu session va correction signal, he thong cang toi uu parser + ranking de tang trust va conversion.
