# SPEC — AI Product Hackathon

**Nhóm:** nhom1_zone3
**Track:** ☐ VinFast · ☐ Vinmec · ☐ VinUni-VinSchool · ☐ XanhSM · ☐ Open
**Problem statement (1 câu):** *Ai gặp vấn đề gì, hiện giải thế nào, AI giúp được gì*
VinFast có 8-12 dòng xe khác nhau (VF e34, VFe35, VF8, VF9, v.v.)
- Mỗi dòng có: giá khác, kích thước khác, tính năng khác, pin khác nhau
- Khách hàng: "Tôi muốn mua xe điện nhưng không biết mua loại nào"

### Vấn đề chính
| Hiện tượng | Pain | Impact |
|-----------|------|--------|
| Khách hàng lặn lội tra cứu | Chưa chắc hiểu specifications, giá cả | Quyết định mua chậm, bỏ cuộc |
| Nhân viên bán hàng phải tư vấn từng người | Overload, tư vấn không consistent | Nhiều khách bỏ đi (không được chào đón) |
| Khách hàng chọn sai xe | Mua sau thì phát hiện không phù hợp ngân sách hoặc nhu cầu | Dissatisfaction, refund, bad review |
| Salesforce bị động | Chỉ khi khách hỏi mới tư vấn, không proactive | Khách "xem xét" rồi bỏ đi, không có follow-up |

### Target User
1. **Khách hàng** (primary): Muốn mua xe nhưng không rõ chọn loại nào
2. **Nhân viên bán hàng** (secondary): Cần hỗ trợ tư vấn, lead generation
3. **Manager** (tertiary): Cần tracking conversion, lead quality

### Metrics của Vấn đề
- **Bounce rate**: ~40% khách vào showroom rồi bỏ đi (không mua)
- **Sales cycle**: 3-5 lần khách hàng quay lại toàn bộ showroom như thể đó là lần đầu tiên
- **Conversion loss**: Khách hàng bỏ cuộc vì không hiểu chọn xe nào

## 1. AI Product Canvas

|   | Value | Trust | Feasibility |
|---|-------|-------|-------------|
| **Câu hỏi** | User nào? Pain gì? AI giải gì? | Khi AI sai thì sao? User sửa bằng cách nào? | Cost/latency bao nhiêu? Risk chính? |
| **Trả lời** | Khách hàng + nhân viên bán hàng; chưa biết chọn xe nào; AI hỏi 5 câu triệu chứng → gợi ý top 3 xe phù hợp, giảm từ 10 phút chờ lễ tân còn <2 phút | AI gợi ý sai xe → khách không buy hoặc refund. Mitigation: luôn show "gặp lễ tân" fallback; AI chỉ gợi ý (augment), nhân viên quyết định cuối; top 3 phải bao gồm 1 budget-safe option | API call ~$0.005/lượt, latency <3s; Risk chính: triệu chứng mơ hồ → gợi ý quá rộng; pricing outdated; hallucinate specs |

**Automation hay augmentation?** ☐ Automation · ☑ Augmentation
Justify: *Augmentation — AI gợi ý, bệnh nhân + lễ tân quyết định cuối cùng; sai xe = khách không mua hoặc phải khám lại, cost rất cao*

**Learning signal:**

1. User correction đi vào đâu? CRM: khách chọn xe nào sau gợi ý → so sánh với xe thực tế đặt
2. Product thu signal gì để biết tốt lên hay tệ đi? Precision on top-3: % khách buy 1 trong 3 gợi ý; customer satisfaction post-purchase
3. Data thuộc loại nào? ☐ User-specific · ☑ Domain-specific · ☑ Real-time · ☑ Human-judgment · ☐ Khác
   Có marginal value không? Có — khách hàng VinFast có preference pattern riêng (gia đình 5 người thường mua VF8, single thường mua VFe34)

---

## 2. User Stories — 4 paths

### Feature: Smart Vehicle Recommendation

**Trigger:** *Khách hàng login chatbot → AI hỏi 5 câu về gia đình, quãng xa, ngân sách → AI gợi ý top 3 xe*

| Path | Câu hỏi thiết kế | Mô tả |
|------|-------------------|-------|
| Happy — AI đúng, tự tin | User thấy gì? Flow kết thúc ra sao? | Khách thấy top 3 xe ranked + giải thích tại sao (VD: "VF8 85% match - phù hợp gia đình 5 người, ngân sách 300-500M"). Khách click "Book test drive" hoặc "Chat thêm" |
| Low-confidence — AI không chắc | System báo "không chắc" bằng cách nào? User quyết thế nào? | AI detect ambiguous input (VD: "mình mua để đi xa" nhưng không biết bao xa) → hỏi lại: "Bạn chạy khoảng mấy km/tháng?" + suggest 3 option. Nếu user vẫn mơ hồ → "gặp nhân viên bán hàng" button |
| Failure — AI sai | User biết AI sai bằng cách nào? Recover ra sao? | Khách được gợi ý VF9 (728M) khi nói "300-500M" → shock tại showroom. Mitigation: AI validate budget_input < price_recommendation; nếu out of range → hỏi confirm lại |
| Correction — user sửa | User sửa bằng cách nào? Data đó đi vào đâu? | Khách thấy top 3 − thay đổi sang xe khác (click thumbs down + select VFe35 thay VF8) → signal đi vào training data; compare với actual car user mua sau 7 ngày → precision metric |

### Feature: Financial Calculator

**Trigger:** *Khách chọn 1 xe → click "Calculate cost" → AI tính trả góp, chi phí điện, so sánh vs xăng*

| Path | Câu hỏi thiết kế | Mô tả |
|------|-------------------|-------|
| Happy — giá đúng, tư vấn rõ | User thấy gì? | Hiển thị: Giá gốc 528M → Khuyến mại 490M → Trả góp 3 năm 18.3M/tháng; chi phí điện 3M/tháng; tiết kiệm 617M vs xe xăng trong 5 năm. Khách thấy rõ ràng → "Đặt hàng" |
| Pricing outdated | System báo sao? | Giá hiển thị 490M nhưng showroom quote 528M (promo hết). Disclaimer luôn hiện: "⚠️ Giá có thể thay đổi, xác nhận với showroom". Nếu diff > 10M → refer to salesperson |
| Financing confusion | User hiểu financing? | Khách hỏi "BaaS là gì?" → AI explain: "BaaS = Battery as a Service, bạn thuê pin thay vì mua. Giảm chi phí ban đầu nhưng phí hàng tháng". Nếu complex → "Chat with salesperson" |
| Correction | User feedback | Khách nhận quote từ salesperson # lệch with AI → user tick "price incorrect" → log vào QA → improve model |

---

## 3. Eval metrics + threshold

**Optimize precision hay recall?** ☑ Precision · ☐ Recall
Tại sao? Precision — khách hàng bỏ cuộc nếu gợi ý sai car → better to recommend 1 chắc chắn than 5 không chắc. Nếu recall thấp (miss xe phù hợp) → khách tự tìm, không dùng AI nữa. Cost of false positive (wrong vehicle) >> cost of false negative (need follow-up)

| Metric | Threshold | Red flag (dừng khi) |
|--------|-----------|---------------------|
| Precision on top-3 (% khách buy 1 trong 3 gợi ý) | ≥80% | <70% trong 1 tuần |
| Budget mismatch rate (% gợi ý ngoài budget khách) | <2% | >5% |
| Price accuracy (lệch vs actual ≤ 5M) | 100% | Bất kỳ lỗi giá tìm thấy |
| Customer satisfaction (NPS post-recommendation) | ≥7/10 | <6/10 |
| Response latency | <3s | >5s avg |
| Hallucination rate (specs sai, specs phù du) | 0% | >0% (any error stop immediately) |

---

## 4. Top 3 failure modes

*Liệt kê cách product có thể fail — không phải list features.*
*"Failure mode nào user KHÔNG BIẾT bị sai? Đó là cái nguy hiểm nhất."*

| # | Trigger | Hậu quả | Mitigation |
|---|---------|---------|------------|
| 1 | AI recommend xe sai ngân sách (VD: khách nói "300-500M" → AI gợi ý VF9 728M) | Khách shock khi tới showroom, mất tin tưởng, không buy, bad review | Detect low-confidence budget → ask user confirm "Bạn muốn 300-500M đúng không?"; validate all recommendations ≤ budget_max; human review first 1000 conversations |
| 2 | Pricing outdated/promotion sai (VD: chat quote 490M nhưng showroom 528M vì promo hết) | Customer frustrated, feeling deceived, negative review, cancel order, PR damage | Real-time sync pricing daily; always show disclaimer "Giá có thể thay đổi"; if price diff > 10M → refer to salesperson; weekly QA check 10 random prices vs actual |
| 3 | AI hallucinates vehicle specs (VD: AI nói "VF8 có 6 chỗ" nhưng thực tế 7 chỗ) | Khách plan sai, buy rồi phát hiện không fit, refund, lawsuit risk | Don't use LLM to generate specs; pull from master DB only; pre-build comparison tables (no AI generation); weekly audit specs vs brochure; only support standard configs (PLUS, PRO, MAX) |

---

## 5. ROI 3 kịch bản

|   | Conservative | Realistic | Optimistic |
|---|-------------|-----------|------------|
| **Assumption** | 100 unique visitor/ngày; 30% upload; 15% conversion (contact salesperson) | 500 unique visitor/ngày; 60% engage; 25% conversion (book test drive) | 2000 unique visitor/ngày; 80% engage; 40% conversion (purchase within 30 days) |
| **Cost** | LLM ~$50/ngày + infra $200/ngày = $250/ngày | $200/ngày LLM + $800/ngày infra = $1,000/ngày | $500/ngày LLM + $1,500/ngày infra = $2,000/ngày |
| **Benefit** | 100 × 15% = 15 lead/ngày; margin 5M/lead = 75M/ngày; annual 27.4B | 500 × 25% = 125 lead/ngày; margin 5M = 625M/ngày; annual 228B | 2000 × 40% = 800 purchase/ngày; margin 5M = 4B/ngày; annual 1.46T |
| **Operational saving** | Reduce support time: 50h/week → 40h/week (không tính) | Reduce: 100h/week → 60h/week; cost saved 5M/week | Reduce: 300h/week → 150h/week; cost saved 20M/week |
| **Net Annual** | 27.4B - (250 × 365) = 27.4B - 91M = **27.3B** | 228B - (1,000 × 365) = 228B - 365M = **227.6B** | 1.46T - (2,000 × 365) = 1.46T - 730M = **1.459T** |
| **Payback** | ~1 day | ~1-2 days | ~4-5 hours |

**Kill criteria:** Nếu precision < 70% liên tục 2 tuần → stop; nếu cost > benefit 1 tháng → pivot; nếu > 10% customer complaint "AI recommend sai" → root cause analysis trước khi scale

---
