import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ClipboardCheck, 
  Trophy, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  LayoutDashboard,
  Database,
  User,
  LogOut,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { STUDENT_ACCOUNTS, TEACHER_ACCOUNT } from './accounts';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  level: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng thấp' | 'Vận dụng cao';
}

export interface QuizResult {
  score: number;
  correctCount: number;
  totalCount: number;
  answers: {
    questionId: number;
    selectedOption: number;
    isCorrect: boolean;
  }[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
}

export const LESSONS: Lesson[] = [
  {
    id: 'bai20',
    title: 'Bài 20: Sự đa dạng và phương pháp nghiên cứu vi sinh vật',
    content: `
# Bài 20: Sự đa dạng và phương pháp nghiên cứu vi sinh vật

## I. Các nhóm vi sinh vật
Vi sinh vật là những sinh vật có kích thước nhỏ bé, thường chỉ quan sát được dưới kính hiển vi. Dựa vào thành phần cấu tạo, vi sinh vật được chia thành các nhóm:
- **Vi sinh vật nhân sơ**: Gồm vi khuẩn (Bacteria) và Archaea.
- **Vi sinh vật nhân thực**: Gồm vi nấm, vi tảo và động vật nguyên sinh.

## II. Các kiểu dinh dưỡng của vi sinh vật
Dựa vào nguồn năng lượng và nguồn carbon, vi sinh vật có 4 kiểu dinh dưỡng chính:
- **Quang tự dưỡng**: Nguồn năng lượng là ánh sáng, nguồn carbon là CO2. (VD: Vi khuẩn lam, tảo đơn bào, trùng roi).
- **Hóa tự dưỡng**: Nguồn năng lượng là chất vô cơ (H2S, NH3, Fe2+), nguồn carbon là CO2. (VD: Vi khuẩn nitrat hóa).
- **Quang dị dưỡng**: Nguồn năng lượng là ánh sáng, nguồn carbon là chất hữu cơ. (VD: Vi khuẩn không lưu huỳnh màu tía).
- **Hóa dị dưỡng**: Nguồn năng lượng là chất hữu cơ, nguồn carbon là chất hữu cơ. (VD: Vi khuẩn phân hủy, nấm, động vật nguyên sinh).

## III. Một số phương pháp nghiên cứu vi sinh vật
1. **Phương pháp quan sát**: Sử dụng kính hiển vi để nghiên cứu hình thái, kích thước. Có các kỹ thuật như soi tươi, nhuộm đơn, nhuộm Gram (phân biệt vi khuẩn Gram dương và Gram âm).
2. **Phương pháp phân lập và nuôi cấy**: Nuôi cấy vi sinh vật trên môi trường thích hợp để thu được khuẩn lạc thuần khiết.
`
  },
  {
    id: 'bai21',
    title: 'Bài 21: Trao đổi chất, sinh trưởng và sinh sản ở vi sinh vật',
    content: `
# Bài 21: Trao đổi chất, sinh trưởng và sinh sản ở vi sinh vật

## I. Quá trình tổng hợp và phân giải các chất
- **Tổng hợp**: Vi sinh vật có khả năng tổng hợp các chất thiết yếu như carbohydrate, protein, lipid và nucleic acid từ các nguồn nguyên liệu đơn giản.
- **Phân giải**: Vi sinh vật tiết enzyme ra môi trường để phân giải các chất hữu cơ phức tạp thành các chất đơn giản để hấp thụ.

## II. Sinh trưởng của quần thể vi khuẩn
Trong nuôi cấy không liên tục, quần thể vi khuẩn sinh trưởng qua 4 pha:
1. **Pha tiềm phát (Lag phase)**: Vi khuẩn thích nghi với môi trường, số lượng tế bào chưa tăng.
2. **Pha lũy thừa (Log phase)**: Vi khuẩn phân chia mạnh mẽ, số lượng tế bào tăng theo cấp số nhân.
3. **Pha cân bằng (Stationary phase)**: Tốc độ sinh trưởng bằng tốc độ chết, số lượng tế bào đạt cực đại và không đổi.
4. **Pha suy vong (Decline phase)**: Chất dinh dưỡng cạn kiệt, chất độc hại tích lũy, số lượng tế bào giảm dần.

## III. Các yếu tố ảnh hưởng đến sinh trưởng
- **Yếu tố vật lý**: Nhiệt độ, độ ẩm, pH, ánh sáng, áp suất thẩm thấu.
- **Yếu tố hóa học**: Các chất dinh dưỡng (protein, carbohydrate...) và các chất ức chế (phenol, cồn, kháng sinh...).

## IV. Các hình thức sinh sản ở vi sinh vật
- **Phân đôi**: Hình thức phổ biến nhất ở vi khuẩn.
- **Sinh sản bằng bào tử**: Có ở nấm và một số vi khuẩn (xạ khuẩn).
- **Nảy chồi**: Có ở nấm men và một số vi khuẩn quang dưỡng.
`
  },
  {
    id: 'bai22',
    title: 'Bài 22: Vai trò và ứng dụng của vi sinh vật',
    content: `
# Bài 22: Vai trò và ứng dụng của vi sinh vật

## I. Vai trò của vi sinh vật
- **Đối với tự nhiên**: Phân giải chất thải và xác sinh vật thành chất khoáng, đảm bảo vòng tuần hoàn vật chất; tạo O2 và chất dinh dưỡng cho các sinh vật khác.
- **Đối với con người**: Chế biến thực phẩm, sản xuất thuốc, xử lý ô nhiễm môi trường.

## II. Một số ứng dụng của vi sinh vật
- **Trong nông nghiệp**: Sản xuất phân bón vi sinh, thuốc bảo vệ thực vật sinh học.
- **Trong chế biến thực phẩm**: Sản xuất rượu, bia, sữa chua, nước mắm, xì dầu...
- **Trong y dược**: Sản xuất kháng sinh, vaccine, hormone, probiotics.
- **Trong xử lý chất thải**: Sử dụng vi sinh vật để phân hủy rác thải hữu cơ, xử lý nước thải, xử lý sự cố tràn dầu.

## III. Thành tựu và triển vọng
Công nghệ vi sinh vật đang phát triển mạnh mẽ với các ứng dụng mới như sản xuất điện năng từ vi sinh vật, xử lý vết nứt bê tông...
`
  },
  {
    id: 'bai24',
    title: 'Bài 24: Khái quát về virus',
    content: `
# Bài 24: Khái quát về virus

## I. Virus và các đặc điểm chung của virus
- Virus là thực thể chưa có cấu tạo tế bào, kích thước vô cùng nhỏ bé (20 - 300 nm).
- Ký sinh nội bào bắt buộc.
- **Cấu tạo**: Gồm lõi nucleic acid (DNA hoặc RNA) và vỏ protein (capsid). Một số virus có thêm lớp vỏ ngoài bằng phospholipid và glycoprotein.

## II. Quá trình nhân lên của virus
Gồm 5 giai đoạn:
1. **Hấp phụ**: Virus bám đặc hiệu lên thụ thể trên bề mặt tế bào chủ.
2. **Xâm nhập**: Virus hoặc vật chất di truyền của virus được đưa vào bên trong tế bào chủ.
3. **Tổng hợp**: Virus sử dụng bộ máy và nguyên liệu của tế bào chủ để tổng hợp nucleic acid và protein cho mình.
4. **Lắp ráp**: Các thành phần đã tổng hợp được lắp ráp thành các hạt virus hoàn chỉnh.
5. **Giải phóng**: Virus thoát ra khỏi tế bào chủ (theo kiểu tan hoặc nảy chồi).
`
  },
  {
    id: 'bai25',
    title: 'Bài 25: Một số bệnh do virus và thành tựu nghiên cứu ứng dụng virus',
    content: `
# Bài 25: Một số bệnh do virus và các thành tựu nghiên cứu ứng dụng virus

## I. Cơ chế gây bệnh chung của virus
Virus gây bệnh bằng cách phá hủy tế bào và mô, sinh ra các độc tố hoặc gây đột biến gene tế bào chủ dẫn đến ung thư.

## II. Một số bệnh do virus
- **Hội chứng AIDS**: Do virus HIV gây ra, tấn công hệ thống miễn dịch của người.
- **Bệnh cúm**: Do virus cúm gây ra ở người và nhiều loài động vật.
- **Bệnh ở thực vật**: Gây các triệu chứng khảm lá, xoăn lá, lùn cây... làm giảm năng suất cây trồng.

## III. Một số thành tựu ứng dụng virus
- **Chế tạo vaccine**: Sử dụng virus đã làm yếu hoặc các thành phần của virus để kích thích hệ miễn dịch.
- **Sản xuất thuốc trừ sâu từ virus**: Sử dụng virus gây bệnh cho côn trùng có hại.
- **Sử dụng virus làm vector chuyển gene**: Ứng dụng trong công nghệ di truyền để đưa gene lành vào tế bào bệnh.
`
  }
];

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Vi sinh vật là những sinh vật có kích thước như thế nào?",
    options: ["Lớn", "Nhỏ bé, thường chỉ quan sát được dưới kính hiển vi", "Vừa", "Khổng lồ"],
    correctAnswer: 1,
    explanation: "Vi sinh vật có kích thước rất nhỏ, mắt thường không nhìn thấy được.",
    level: 'Nhận biết'
  },
  {
    id: 2,
    text: "Dựa vào thành phần cấu tạo, vi sinh vật được chia thành mấy nhóm?",
    options: ["2 nhóm: nhân sơ và nhân thực", "3 nhóm: thực vật, động vật, nấm", "4 nhóm", "5 nhóm"],
    correctAnswer: 0,
    explanation: "Vi sinh vật được chia thành 2 nhóm chính dựa trên cấu tạo tế bào: nhân sơ và nhân thực.",
    level: 'Nhận biết'
  },
  {
    id: 3,
    text: "Nhóm nào sau đây thuộc vi sinh vật nhân sơ?",
    options: ["Vi khuẩn, Archaea", "Nấm, Tảo", "Động vật nguyên sinh", "Virus"],
    correctAnswer: 0,
    explanation: "Vi khuẩn và Archaea là các sinh vật nhân sơ.",
    level: 'Nhận biết'
  },
  {
    id: 4,
    text: "Nhóm nào sau đây thuộc vi sinh vật nhân thực?",
    options: ["Vi khuẩn", "Archaea", "Nấm đơn bào, tảo đơn bào, động vật nguyên sinh", "Virus"],
    correctAnswer: 2,
    explanation: "Nấm, tảo và động vật nguyên sinh là các sinh vật nhân thực.",
    level: 'Nhận biết'
  },
  {
    id: 5,
    text: "Đặc điểm chung của vi sinh vật là gì?",
    options: ["Sinh trưởng chậm", "Kích thước lớn", "Tốc độ chuyển hóa và sinh sản nhanh, phân bố rộng", "Cấu tạo đa bào phức tạp"],
    correctAnswer: 2,
    explanation: "Vi sinh vật có đặc điểm là kích thước nhỏ, trao đổi chất và sinh sản rất nhanh.",
    level: 'Nhận biết'
  },
  {
    id: 6,
    text: "Tại sao vi sinh vật có tốc độ trao đổi chất nhanh?",
    options: ["Vì có kích thước nhỏ, tỉ lệ S/V lớn", "Vì có nhiều bào quan", "Vì có thành tế bào dày", "Vì sống trong nước"],
    correctAnswer: 0,
    explanation: "Kích thước nhỏ giúp tỉ lệ diện tích bề mặt trên thể tích (S/V) lớn, giúp hấp thụ chất dinh dưỡng nhanh.",
    level: 'Thông hiểu'
  },
  {
    id: 7,
    text: "Archaea là nhóm sinh vật gì?",
    options: ["Nhân thực", "Nhân sơ đơn bào", "Đa bào", "Virus"],
    correctAnswer: 1,
    explanation: "Archaea là nhóm sinh vật nhân sơ đơn bào, thường sống ở điều kiện cực đoan.",
    level: 'Nhận biết'
  },
  {
    id: 8,
    text: "Loài Thermococcus piezophilus sống được ở đâu?",
    options: ["Nước ngọt", "Hang động sâu dưới đáy biển (áp suất cao)", "Trên lá cây", "Trong miệng núi lửa"],
    correctAnswer: 1,
    explanation: "Đây là loài vi khuẩn ưa áp suất cao, sống ở đáy biển sâu.",
    level: 'Thông hiểu'
  },
  {
    id: 9,
    text: "Loài Halobacterium salinarum có đặc điểm gì?",
    options: ["Chịu nhiệt", "Chịu mặn (nồng độ muối cao)", "Chịu acid", "Chịu phóng xạ"],
    correctAnswer: 1,
    explanation: "Đây là loài vi khuẩn ưa mặn.",
    level: 'Thông hiểu'
  },
  {
    id: 10,
    text: "Vi khuẩn Deinococcus radiodurans nổi tiếng với khả năng gì?",
    options: ["Quang hợp", "Chịu phóng xạ cao", "Di động nhanh", "Lên men"],
    correctAnswer: 1,
    explanation: "Đây là loài vi khuẩn có khả năng chịu được mức phóng xạ cực cao.",
    level: 'Thông hiểu'
  },
  {
    id: 11,
    text: "Khuẩn lạc là gì?",
    options: ["Một tế bào vi khuẩn", "Tập hợp các tế bào sinh ra từ một tế bào ban đầu trên môi trường thạch", "Một nhóm virus", "Tế bào nấm"],
    correctAnswer: 1,
    explanation: "Khuẩn lạc là một đám tế bào vi khuẩn có thể nhìn thấy bằng mắt thường.",
    level: 'Nhận biết'
  },
  {
    id: 12,
    text: "Phương pháp nhuộm Gram giúp phân biệt nhóm vi khuẩn nào?",
    options: ["Vi khuẩn có hại và có lợi", "Vi khuẩn Gram dương (Gr+) và Gram âm (Gr-)", "Vi khuẩn nhân sơ và nấm", "Vi khuẩn và virus"],
    correctAnswer: 1,
    explanation: "Nhuộm Gram dựa trên cấu tạo thành tế bào để phân biệt Gr+ và Gr-.",
    level: 'Nhận biết'
  },
  {
    id: 13,
    text: "Trong nhuộm Gram, vi khuẩn Gram dương bắt màu gì?",
    options: ["Đỏ", "Xanh", "Tím", "Vàng"],
    correctAnswer: 2,
    explanation: "Vi khuẩn Gram dương giữ được phức hợp màu tím kết tinh.",
    level: 'Thông hiểu'
  },
  {
    id: 14,
    text: "Trong nhuộm Gram, vi khuẩn Gram âm bắt màu gì?",
    options: ["Đỏ", "Tím", "Xanh", "Không màu"],
    correctAnswer: 0,
    explanation: "Vi khuẩn Gram âm bị tẩy màu tím và bắt màu đỏ của thuốc nhuộm bổ sung.",
    level: 'Thông hiểu'
  },
  {
    id: 15,
    text: "Mục đích của việc soi tươi vi khuẩn là gì?",
    options: ["Quan sát cấu tạo DNA", "Quan sát trạng thái sống và khả năng di động", "Xác định kiểu dinh dưỡng", "Đếm số lượng gene"],
    correctAnswer: 1,
    explanation: "Soi tươi giúp quan sát vi khuẩn khi chúng còn đang sống và di chuyển.",
    level: 'Thông hiểu'
  },
  {
    id: 16,
    text: "Kiểu dinh dưỡng quang tự dưỡng sử dụng nguồn năng lượng từ đâu?",
    options: ["Chất hữu cơ", "Chất vô cơ", "Ánh sáng", "Nhiệt độ"],
    correctAnswer: 2,
    explanation: "Quang tự dưỡng sử dụng ánh sáng làm nguồn năng lượng.",
    level: 'Nhận biết'
  },
  {
    id: 17,
    text: "Nguồn carbon của vi sinh vật hóa tự dưỡng là gì?",
    options: ["Chất hữu cơ", "CO2, HCO3-", "Protein", "Lipid"],
    correctAnswer: 1,
    explanation: "Các sinh vật tự dưỡng sử dụng CO2 làm nguồn carbon chính.",
    level: 'Nhận biết'
  },
  {
    id: 18,
    text: "Kiểu dinh dưỡng của nấm và nhiều vi khuẩn là gì?",
    options: ["Quang tự dưỡng", "Hóa tự dưỡng", "Quang dị dưỡng", "Hóa dị dưỡng"],
    correctAnswer: 3,
    explanation: "Nấm và nhiều vi khuẩn lấy năng lượng và carbon từ chất hữu cơ.",
    level: 'Nhận biết'
  },
  {
    id: 19,
    text: "Sự khác biệt giữa tự dưỡng và dị dưỡng là ở đâu?",
    options: ["Nguồn năng lượng", "Nguồn carbon (vô cơ vs hữu cơ)", "Khả năng di động", "Cấu tạo vỏ"],
    correctAnswer: 1,
    explanation: "Tự dưỡng dùng carbon vô cơ (CO2), dị dưỡng dùng carbon hữu cơ.",
    level: 'Thông hiểu'
  },
  {
    id: 20,
    text: "Vi khuẩn lam thuộc kiểu dinh dưỡng nào?",
    options: ["Quang tự dưỡng", "Hóa tự dưỡng", "Quang dị dưỡng", "Hóa dị dưỡng"],
    correctAnswer: 0,
    explanation: "Vi khuẩn lam quang hợp bằng ánh sáng và CO2.",
    level: 'Vận dụng thấp'
  },
  {
    id: 21,
    text: "Vi khuẩn nitrate hóa thuộc kiểu dinh dưỡng nào?",
    options: ["Quang tự dưỡng", "Hóa tự dưỡng", "Quang dị dưỡng", "Hóa dị dưỡng"],
    correctAnswer: 1,
    explanation: "Chúng oxy hóa các hợp chất nitơ vô cơ để lấy năng lượng.",
    level: 'Vận dụng thấp'
  },
  {
    id: 22,
    text: "Vi khuẩn không lưu huỳnh màu lục thuộc kiểu dinh dưỡng nào?",
    options: ["Quang tự dưỡng", "Quang dị dưỡng", "Hóa tự dưỡng", "Hóa dị dưỡng"],
    correctAnswer: 1,
    explanation: "Chúng dùng ánh sáng làm năng lượng và chất hữu cơ làm nguồn carbon.",
    level: 'Vận dụng thấp'
  },
  {
    id: 23,
    text: "Nhóm vi sinh vật nào chiếm 1/2 sinh khối trên Trái Đất?",
    options: ["Nấm", "Tảo", "Vi khuẩn", "Động vật nguyên sinh"],
    correctAnswer: 2,
    explanation: "Vi khuẩn có số lượng cực lớn và phân bố khắp nơi.",
    level: 'Nhận biết'
  },
  {
    id: 24,
    text: "Tại sao vi sinh vật phân bố rộng khắp mọi nơi?",
    options: ["Do có kích thước nhỏ, dễ phát tán và thích nghi cao", "Do chúng quá mạnh", "Do chúng không cần thức ăn", "Do chúng có cánh"],
    correctAnswer: 0,
    explanation: "Kích thước nhỏ giúp chúng dễ dàng phát tán theo gió, nước.",
    level: 'Thông hiểu'
  },
  {
    id: 25,
    text: "Ý nghĩa của việc nhuộm Gram trong y học là gì?",
    options: ["Để làm đẹp vi khuẩn", "Giúp bác sĩ lựa chọn loại kháng sinh hiệu quả", "Để vi khuẩn dễ chết hơn", "Để đếm số lượng vi khuẩn"],
    correctAnswer: 1,
    explanation: "Kháng sinh tác động khác nhau lên vi khuẩn Gr+ và Gr-.",
    level: 'Vận dụng cao'
  },
  {
    id: 26,
    text: "Quá trình đồng hóa ở vi sinh vật là gì?",
    options: ["Phân giải các chất", "Tổng hợp các chất hữu cơ phức tạp từ chất đơn giản", "Thải chất bã", "Hấp thụ nước"],
    correctAnswer: 1,
    explanation: "Đồng hóa là quá trình tổng hợp chất hữu cơ tích lũy năng lượng.",
    level: 'Nhận biết'
  },
  {
    id: 27,
    text: "Vi khuẩn lam tổng hợp carbohydrate thông qua chu trình nào?",
    options: ["Chu trình Krebs", "Chu trình Calvin", "Lên men", "Hô hấp kị khí"],
    correctAnswer: 1,
    explanation: "Chu trình Calvin là quá trình cố định CO2 trong quang hợp.",
    level: 'Thông hiểu'
  },
  {
    id: 28,
    text: "Thành tế bào vi khuẩn cấu tạo từ chất nào?",
    options: ["Cellulose", "Chitin", "Peptidoglycan", "Tinh bột"],
    correctAnswer: 2,
    explanation: "Peptidoglycan là thành phần đặc trưng của thành tế bào vi khuẩn.",
    level: 'Nhận biết'
  },
  {
    id: 29,
    text: "Chitin là thành phần cấu tạo thành tế bào của nhóm nào?",
    options: ["Vi khuẩn", "Tảo lục", "Nấm", "Động vật nguyên sinh"],
    correctAnswer: 2,
    explanation: "Thành tế bào nấm được cấu tạo từ chitin.",
    level: 'Nhận biết'
  },
  {
    id: 30,
    text: "Quá trình biến đổi N2 thành NH3 gọi là gì?",
    options: ["Nitrate hóa", "Cố định nitrogen", "Ammon hóa", "Phản nitrate hóa"],
    correctAnswer: 1,
    explanation: "Cố định nitrogen là biến nitơ tự do thành dạng cây có thể hấp thụ.",
    level: 'Nhận biết'
  },
  {
    id: 31,
    text: "Vi khuẩn nào có khả năng cố định nitrogen?",
    options: ["E. coli", "Rhizobium", "Lactobacillus", "Nấm men"],
    correctAnswer: 1,
    explanation: "Rhizobium cộng sinh trong nốt sần cây họ Đậu để cố định đạm.",
    level: 'Thông hiểu'
  },
  {
    id: 32,
    text: "Lipid được tổng hợp từ các đơn phân nào?",
    options: ["Amino acid", "Đường đơn", "Acid béo và glycerol", "Nucleotide"],
    correctAnswer: 2,
    explanation: "Lipid cấu tạo từ glycerol và các acid béo.",
    level: 'Nhận biết'
  },
  {
    id: 33,
    text: "Đơn phân của nucleic acid là gì?",
    options: ["Amino acid", "Glucose", "Nucleotide", "Acid béo"],
    correctAnswer: 2,
    explanation: "Nucleotide là đơn vị cấu tạo nên DNA và RNA.",
    level: 'Nhận biết'
  },
  {
    id: 34,
    text: "Vi sinh vật hoại sinh phân giải chất hữu cơ bằng cách nào?",
    options: ["Ăn trực tiếp", "Tiết enzyme ngoại bào", "Quang hợp", "Kí sinh"],
    correctAnswer: 1,
    explanation: "Chúng tiết enzyme ra ngoài để phân hủy chất hữu cơ rồi mới hấp thụ.",
    level: 'Thông hiểu'
  },
  {
    id: 35,
    text: "Sinh trưởng của quần thể vi khuẩn là gì?",
    options: ["Sự tăng kích thước tế bào", "Sự tăng số lượng tế bào trong quần thể", "Sự tăng khối lượng tế bào", "Sự thay đổi hình dạng"],
    correctAnswer: 1,
    explanation: "Ở vi sinh vật, sinh trưởng được hiểu là sự gia tăng số lượng cá thể.",
    level: 'Nhận biết'
  },
  {
    id: 36,
    text: "Thời gian thế hệ (g) là gì?",
    options: ["Thời gian vi khuẩn chết", "Thời gian để số tế bào trong quần thể tăng gấp đôi", "Thời gian một vòng đời", "Thời gian bắt đầu nuôi"],
    correctAnswer: 1,
    explanation: "Là khoảng thời gian cần thiết để quần thể nhân đôi số lượng.",
    level: 'Nhận biết'
  },
  {
    id: 37,
    text: "Thời gian thế hệ của E. coli trong điều kiện tối ưu là bao nhiêu?",
    options: ["20 phút", "60 phút", "12 giờ", "24 giờ"],
    correctAnswer: 0,
    explanation: "E. coli sinh sản rất nhanh, chỉ mất khoảng 20 phút mỗi lần phân chia.",
    level: 'Vận dụng thấp'
  },
  {
    id: 38,
    text: "Sau 2 giờ nuôi cấy E. coli (g=20p) từ 1 tế bào, số tế bào tạo thành là?",
    options: ["8", "16", "32", "64"],
    correctAnswer: 3,
    explanation: "2 giờ = 120 phút = 6 thế hệ. 2^6 = 64 tế bào.",
    level: 'Vận dụng thấp'
  },
  {
    id: 39,
    text: "Quần thể vi khuẩn nuôi cấy không liên tục trải qua mấy pha?",
    options: ["2 pha", "3 pha", "4 pha", "5 pha"],
    correctAnswer: 2,
    explanation: "Gồm 4 pha: Tiềm phát, Lũy thừa, Cân bằng, Suy vong.",
    level: 'Nhận biết'
  },
  {
    id: 40,
    text: "Thứ tự các pha trong nuôi cấy không liên tục là?",
    options: ["Lũy thừa -> Tiềm phát -> Cân bằng -> Suy vong", "Tiềm phát -> Lũy thừa -> Cân bằng -> Suy vong", "Cân bằng -> Lũy thừa -> Tiềm phát -> Suy vong", "Suy vong -> Cân bằng -> Lũy thừa -> Tiềm phát"],
    correctAnswer: 1,
    explanation: "Bắt đầu từ pha thích nghi (tiềm phát) đến pha suy giảm (suy vong).",
    level: 'Thông hiểu'
  },
  {
    id: 41,
    text: "Ở pha nào vi khuẩn thích nghi và chưa phân chia?",
    options: ["Pha tiềm phát", "Pha lũy thừa", "Pha cân bằng", "Pha suy vong"],
    correctAnswer: 0,
    explanation: "Pha tiềm phát là giai đoạn vi khuẩn làm quen với môi trường mới.",
    level: 'Thông hiểu'
  },
  {
    id: 42,
    text: "Ở pha nào số lượng tế bào tăng theo lũy thừa?",
    options: ["Pha tiềm phát", "Pha lũy thừa", "Pha cân bằng", "Pha suy vong"],
    correctAnswer: 1,
    explanation: "Pha lũy thừa là lúc vi khuẩn phân chia mạnh mẽ nhất.",
    level: 'Thông hiểu'
  },
  {
    id: 43,
    text: "Ở pha nào số tế bào sinh ra bằng số tế bào chết đi?",
    options: ["Pha tiềm phát", "Pha lũy thừa", "Pha cân bằng", "Pha suy vong"],
    correctAnswer: 2,
    explanation: "Ở pha cân bằng, số lượng quần thể đạt mức ổn định tối đa.",
    level: 'Thông hiểu'
  },
  {
    id: 44,
    text: "Tại sao có pha suy vong trong nuôi cấy không liên tục?",
    options: ["Do nhiệt độ cao", "Do dinh dưỡng cạn kiệt, chất độc tích lũy", "Do ánh sáng yếu", "Do vi khuẩn sinh sản quá nhanh"],
    correctAnswer: 1,
    explanation: "Môi trường không được bổ sung dinh dưỡng dẫn đến cạn kiệt và ô nhiễm.",
    level: 'Thông hiểu'
  },
  {
    id: 45,
    text: "Môi trường nuôi cấy liên tục là gì?",
    options: ["Không bổ sung dinh dưỡng", "Thường xuyên bổ sung dinh dưỡng và loại bỏ sản phẩm trao đổi chất", "Môi trường đóng kín", "Chỉ dùng thạch"],
    correctAnswer: 1,
    explanation: "Giúp duy trì quần thể vi khuẩn ở pha lũy thừa trong thời gian dài.",
    level: 'Nhận biết'
  },
  {
    id: 46,
    text: "Nhóm vi sinh vật ưa nhiệt sinh trưởng tốt ở nhiệt độ nào?",
    options: ["Dưới 15 độ C", "20-40 độ C", "55-65 độ C", "75-100 độ C"],
    correctAnswer: 2,
    explanation: "Vi sinh vật ưa nhiệt thường sống ở suối nước nóng hoặc đống ủ phân.",
    level: 'Nhận biết'
  },
  {
    id: 47,
    text: "Tại sao thực phẩm để trong tủ lạnh lâu hỏng?",
    options: ["Vì vi sinh vật bị tiêu diệt", "Vì nhiệt độ thấp kìm hãm sinh trưởng của vi sinh vật", "Vì không có oxy", "Vì tủ lạnh rất sạch"],
    correctAnswer: 1,
    explanation: "Nhiệt độ thấp làm chậm quá trình trao đổi chất của vi sinh vật.",
    level: 'Thông hiểu'
  },
  {
    id: 48,
    text: "Ướp muối thực phẩm giúp bảo quản lâu dựa trên cơ chế nào?",
    options: ["Nhiệt độ", "Áp suất thẩm thấu cao gây co nguyên sinh", "Độ pH", "Ánh sáng"],
    correctAnswer: 1,
    explanation: "Nồng độ muối cao rút nước từ tế bào vi sinh vật, làm chúng không thể hoạt động.",
    level: 'Thông hiểu'
  },
  {
    id: 49,
    text: "Chất nào được dùng để khử trùng phòng thí nghiệm, bệnh viện?",
    options: ["Nước", "Hợp chất phenol", "Đường", "Vitamin"],
    correctAnswer: 1,
    explanation: "Phenol và các dẫn xuất có khả năng diệt khuẩn mạnh.",
    level: 'Nhận biết'
  },
  {
    id: 50,
    text: "Cồn (ethanol) nồng độ bao nhiêu thường dùng để thanh trùng y tế?",
    options: ["20-30%", "70-80%", "95-100%", "5-10%"],
    correctAnswer: 1,
    explanation: "Cồn 70-80 độ có khả năng thẩm thấu và diệt khuẩn tốt nhất.",
    level: 'Nhận biết'
  },
  {
    id: 51,
    text: "Kháng sinh là gì?",
    options: ["Chất kích thích vi khuẩn", "Chất tiết ra để ức chế hoặc tiêu diệt vi khuẩn khác", "Dinh dưỡng cho nấm", "Enzyme tiêu hóa"],
    correctAnswer: 1,
    explanation: "Kháng sinh là những hợp chất hữu cơ do vi sinh vật tổng hợp có khả năng ức chế hoặc tiêu diệt các vi sinh vật khác.",
    level: 'Nhận biết'
  },
  {
    id: 52,
    text: "Hậu quả của việc lạm dụng kháng sinh là gì?",
    options: ["Vi khuẩn lớn nhanh hơn", "Xuất hiện các chủng vi khuẩn kháng thuốc", "Người béo lên", "Tăng cường miễn dịch"],
    correctAnswer: 1,
    explanation: "Lạm dụng kháng sinh tạo áp lực chọn lọc, dẫn đến sự xuất hiện và lan rộng của các vi khuẩn kháng thuốc.",
    level: 'Vận dụng cao'
  },
  {
    id: 53,
    text: "Hình thức sinh sản phổ biến nhất ở vi khuẩn là?",
    options: ["Phân đôi", "Nảy chồi", "Bào tử hữu tính", "Tiếp hợp"],
    correctAnswer: 0,
    explanation: "Phân đôi là hình thức sinh sản vô tính phổ biến nhất ở các loài vi khuẩn.",
    level: 'Nhận biết'
  },
  {
    id: 54,
    text: "Nội bào tử ở vi khuẩn dùng để làm gì?",
    options: ["Sinh sản", "Sống tiềm sinh chống chịu điều kiện bất lợi", "Trao đổi chất", "Bám vào vật chủ"],
    correctAnswer: 1,
    explanation: "Nội bào tử không phải là hình thức sinh sản mà là dạng nghỉ giúp vi khuẩn sống sót qua điều kiện khắc nghiệt.",
    level: 'Thông hiểu'
  },
  {
    id: 55,
    text: "Loài nào sinh sản bằng nảy chồi?",
    options: ["Vi khuẩn E. coli", "Nấm men Saccharomyces cerevisiae", "Tảo lục", "Trùng giày"],
    correctAnswer: 1,
    explanation: "Nấm men thường sinh sản bằng cách nảy chồi từ tế bào mẹ.",
    level: 'Thông hiểu'
  },
  {
    id: 56,
    text: "Phân đôi ở vi khuẩn khác nảy chồi ở điểm nào?",
    options: ["Phân đôi tạo 2 tế bào bằng nhau, nảy chồi tạo cá thể con nhỏ hơn từ mẹ", "Phân đôi là hữu tính", "Nảy chồi chỉ có ở vi khuẩn", "Phân đôi cần bào tử"],
    correctAnswer: 0,
    explanation: "Phân đôi chia tế bào mẹ thành hai phần tương đương, trong khi nảy chồi tạo ra chồi nhỏ rồi mới tách ra.",
    level: 'Thông hiểu'
  },
  {
    id: 57,
    text: "Muốn thu sinh khối vi khuẩn nhiều nhất trong nuôi cấy liên tục, cần giữ quần thể ở pha nào?",
    options: ["Pha tiềm phát", "Pha lũy thừa", "Pha cân bằng", "Pha suy vong"],
    correctAnswer: 1,
    explanation: "Ở pha lũy thừa, tốc độ sinh trưởng của vi khuẩn là cực đại.",
    level: 'Vận dụng thấp'
  },
  {
    id: 58,
    text: "Tại sao người khuyết dưỡng amino acid X không thể sống trên môi trường thiếu X?",
    options: ["Vì chúng không thích X", "Vì chúng không tự tổng hợp được X", "Vì X là chất độc", "Vì X quá đắt"],
    correctAnswer: 1,
    explanation: "Vi sinh vật khuyết dưỡng thiếu gene tổng hợp một chất thiết yếu nào đó nên phải lấy từ môi trường.",
    level: 'Thông hiểu'
  },
  {
    id: 59,
    text: "Bào tử đốt là hình thức sinh sản của?",
    options: ["Vi khuẩn lam", "Xạ khuẩn", "Nấm men", "Virus"],
    correctAnswer: 1,
    explanation: "Xạ khuẩn sinh sản bằng cách phân cắt sợi nấm thành các bào tử đốt.",
    level: 'Nhận biết'
  },
  {
    id: 60,
    text: "Clo được dùng để làm gì trong thực tế?",
    options: ["Ướp muối thịt", "Thanh trùng nước máy, nước bể bơi", "Sản xuất rượu", "Bón cây"],
    correctAnswer: 1,
    explanation: "Clo là chất oxy hóa mạnh, dùng để diệt khuẩn trong xử lý nước.",
    level: 'Nhận biết'
  },
  {
    id: 61,
    text: "Vai trò của vi sinh vật trong tự nhiên là gì?",
    options: ["Gây bệnh", "Phân giải chất thải, đảm bảo vòng tuần hoàn vật chất", "Làm nóng Trái Đất", "Chỉ cung cấp thức ăn"],
    correctAnswer: 1,
    explanation: "Vi sinh vật đóng vai trò quan trọng trong việc phân hủy chất hữu cơ và tái tạo vật chất.",
    level: 'Nhận biết'
  },
  {
    id: 62,
    text: "Tại sao vi sinh vật tự dưỡng có vai trò quan trọng?",
    options: ["Vì chúng tạo ra O2 và chất hữu cơ cung cấp cho sinh vật dị dưỡng", "Vì chúng rất đẹp", "Vì chúng sống lâu", "Vì chúng có kích thước nhỏ"],
    correctAnswer: 0,
    explanation: "Các sinh vật tự dưỡng là sinh vật sản xuất, tạo nền tảng cho chuỗi thức ăn.",
    level: 'Thông hiểu'
  },
  {
    id: 63,
    text: "Ứng dụng vi sinh vật trong nông nghiệp thường thấy là?",
    options: ["Sản xuất ô tô", "Sản xuất phân bón vi sinh, thuốc trừ sâu vi sinh", "Sản xuất vải", "Sản xuất giấy"],
    correctAnswer: 1,
    explanation: "Vi sinh vật được dùng để cố định đạm, phân giải lân hoặc diệt sâu bọ.",
    level: 'Nhận biết'
  },
  {
    id: 64,
    text: "Chế phẩm Bt (Bacillus thuringiensis) là gì?",
    options: ["Phân đạm", "Thuốc trừ sâu vi sinh", "Hormone tăng trưởng", "Thuốc kháng sinh"],
    correctAnswer: 1,
    explanation: "Vi khuẩn Bt tiết ra độc tố diệt côn trùng, được dùng làm thuốc trừ sâu sinh học.",
    level: 'Nhận biết'
  },
  {
    id: 65,
    text: "Loại vi sinh vật nào dùng để sản xuất bia, rượu?",
    options: ["Vi khuẩn lactic", "Nấm men Saccharomyces cerevisiae", "Xạ khuẩn", "Virus"],
    correctAnswer: 1,
    explanation: "Nấm men thực hiện quá trình lên men ethanol từ đường.",
    level: 'Nhận biết'
  },
  {
    id: 66,
    text: "Sữa chua là sản phẩm của vi khuẩn nào?",
    options: ["Vi khuẩn nitrate hóa", "Vi khuẩn lactic", "Vi khuẩn lam", "E. coli"],
    correctAnswer: 1,
    explanation: "Vi khuẩn lactic lên men đường lactose trong sữa thành acid lactic làm sữa đông tụ.",
    level: 'Nhận biết'
  },
  {
    id: 67,
    text: "Cơ sở khoa học của làm nước mắm, nước tương?",
    options: ["Lên men đường", "Phân giải protein nhờ enzyme protease của vi sinh vật", "Tổng hợp lipid", "Quang hợp"],
    correctAnswer: 1,
    explanation: "Vi sinh vật phân giải protein trong cá/đậu nành thành các amino acid.",
    level: 'Thông hiểu'
  },
  {
    id: 68,
    text: "Sản phẩm nào sau đây là ứng dụng vi sinh vật trong y dược?",
    options: ["Kháng sinh, vaccine, insulin", "Gạch xây nhà", "Xăng dầu", "Nhựa"],
    correctAnswer: 0,
    explanation: "Vi sinh vật được dùng để sản xuất nhiều loại dược phẩm quan trọng.",
    level: 'Nhận biết'
  },
  {
    id: 69,
    text: "Khí biogas được tạo ra từ quá trình nào?",
    options: ["Quang hợp", "Phân giải chất thải chăn nuôi bởi Archaea sinh methane", "Hô hấp hiếu khí", "Nhuộm Gram"],
    correctAnswer: 1,
    explanation: "Vi khuẩn cổ sinh methane phân hủy chất hữu cơ trong điều kiện kị khí tạo ra khí CH4.",
    level: 'Thông hiểu'
  },
  {
    id: 70,
    text: "Vi khuẩn Alcanivorax borkumensis dùng để làm gì?",
    options: ["Sản xuất sữa chua", "Xử lý sự cố tràn dầu", "Chữa bệnh lao", "Lên men bia"],
    correctAnswer: 1,
    explanation: "Đây là loài vi khuẩn có khả năng phân hủy hydrocarbon trong dầu mỏ.",
    level: 'Thông hiểu'
  },
  {
    id: 71,
    text: "Thành tựu nào thuộc về công nghệ lên men?",
    options: ["Thức ăn chăn nuôi, bia, rượu", "Thuốc bảo vệ thực vật", "Vaccine", "Phân vi sinh"],
    correctAnswer: 0,
    explanation: "Lên men là quá trình chuyển hóa đường thành các sản phẩm hữu ích nhờ vi sinh vật.",
    level: 'Nhận biết'
  },
  {
    id: 72,
    text: "Ngành nghề nào liên quan đến công nghệ vi sinh vật?",
    options: ["Kĩ sư chế biến thực phẩm", "Dược sĩ", "Nhà dịch tễ học", "Tất cả các phương án trên"],
    correctAnswer: 3,
    explanation: "Công nghệ vi sinh có ứng dụng rộng rãi trong nhiều ngành nghề khác nhau.",
    level: 'Thông hiểu'
  },
  {
    id: 73,
    text: "Sâu răng chủ yếu do vi khuẩn nào gây ra?",
    options: ["Vi khuẩn trong mảng bám lên men đường thành acid phá hủy men răng", "Virus cúm", "Vi khuẩn lao", "Nấm"],
    correctAnswer: 0,
    explanation: "Acid sinh ra từ quá trình lên men đường của vi khuẩn làm mòn men răng.",
    level: 'Thông hiểu'
  },
  {
    id: 74,
    text: "Tại sao trồng đậu nành lại giúp duy trì nitrogen trong đất?",
    options: ["Vì đậu nành hút nitrogen từ đất", "Vì rễ đậu nành có vi khuẩn Rhizobium cộng sinh cố định nitrogen", "Vì lá đậu nành có màu xanh", "Vì hạt đậu nành chứa nhiều đạm"],
    correctAnswer: 1,
    explanation: "Vi khuẩn Rhizobium biến N2 không khí thành dạng đạm mà cây và đất có thể sử dụng.",
    level: 'Thông hiểu'
  },
  {
    id: 75,
    text: "Enzyme amylase, protease được bổ sung vào bột giặt để làm gì?",
    options: ["Làm thơm quần áo", "Tẩy sạch các vết bẩn hữu cơ khó sạch", "Diệt khuẩn", "Làm mềm vải"],
    correctAnswer: 1,
    explanation: "Enzyme giúp phân hủy các vết bẩn từ tinh bột (amylase) và protein (protease).",
    level: 'Thông hiểu'
  },
  {
    id: 76,
    text: "Tại sao thức ăn nhiệt đới nhanh hỏng hơn ôn đới?",
    options: ["Do nhiệt độ và độ ẩm cao thuận lợi cho vi sinh vật phát triển", "Do người nhiệt đới ăn nhiều hơn", "Do thức ăn nhiệt đới ngon hơn", "Do ánh sáng quá mạnh"],
    correctAnswer: 0,
    explanation: "Khí hậu nóng ẩm là điều kiện lý tưởng cho sự sinh trưởng của vi sinh vật gây hỏng thực phẩm.",
    level: 'Thông hiểu'
  },
  {
    id: 77,
    text: "Vi khuẩn Helicobacter pylori liên quan đến bệnh gì?",
    options: ["Viêm loét dạ dày", "Viêm phổi", "Bại liệt", "Sốt xuất huyết"],
    correctAnswer: 0,
    explanation: "H. pylori là tác nhân chính gây viêm loét và ung thư dạ dày.",
    level: 'Nhận biết'
  },
  {
    id: 78,
    text: "Nguyên nhân virus SARS-CoV-2 gây bệnh viêm phổi cấp?",
    options: ["Do nó phá hủy các mô phổi", "Do nó làm người bệnh đói", "Do nó làm thay đổi màu da", "Do nó sống trong nước"],
    correctAnswer: 0,
    explanation: "Virus xâm nhập và nhân lên trong tế bào biểu mô đường hô hấp và phổi, gây tổn thương nghiêm trọng.",
    level: 'Thông hiểu'
  },
  {
    id: 79,
    text: "Probiotics là gì?",
    options: ["Chất kháng sinh", "Nhóm vi sinh vật có lợi cho sức khỏe", "Độc tố vi khuẩn", "Vỏ virus"],
    correctAnswer: 1,
    explanation: "Probiotics là các vi sinh vật sống mang lại lợi ích sức khỏe cho vật chủ khi được tiêu thụ đủ lượng.",
    level: 'Nhận biết'
  },
  {
    id: 80,
    text: "Triển vọng của công nghệ vi sinh trong tương lai?",
    options: ["Sản xuất điện năng từ vi khuẩn", "Bê tông tự lành vết nứt", "Sản xuất vaccine thế hệ mới", "Tất cả các phương án trên"],
    correctAnswer: 3,
    explanation: "Công nghệ vi sinh đang mở ra nhiều hướng ứng dụng đột phá trong nhiều lĩnh vực.",
    level: 'Thông hiểu'
  },
  {
    id: 81,
    text: "Virus là gì?",
    options: ["Sinh vật đa bào", "Thực thể chưa có cấu tạo tế bào", "Một loại nấm nhỏ", "Vi khuẩn tí hon"],
    correctAnswer: 1,
    explanation: "Virus không phải là tế bào, chúng chỉ là các thực thể di truyền có vỏ bọc.",
    level: 'Nhận biết'
  },
  {
    id: 82,
    text: "Thành phần cơ bản của virus gồm?",
    options: ["Vỏ protein và lõi nucleic acid", "Màng sinh chất và nhân", "Thành tế bào và tế bào chất", "Lông và roi"],
    correctAnswer: 0,
    explanation: "Mọi virus đều có lõi là vật chất di truyền và vỏ bảo vệ bằng protein.",
    level: 'Nhận biết'
  },
  {
    id: 83,
    text: "Tại sao virus không được xem là một vật sống hoàn chỉnh?",
    options: ["Vì chúng quá nhỏ", "Vì chúng chưa có cấu tạo tế bào và không thể nhân lên ngoài tế bào chủ", "Vì chúng không có DNA", "Vì chúng có màu sắc đa dạng"],
    correctAnswer: 1,
    explanation: "Virus thiếu các bộ máy chuyển hóa cơ bản và phải ký sinh bắt buộc để nhân lên.",
    level: 'Thông hiểu'
  },
  {
    id: 84,
    text: "Vỏ protein của virus gọi là gì?",
    options: ["Vỏ ngoài", "Vỏ capsid", "Vỏ peptidoglycan", "Màng phospholipid"],
    correctAnswer: 1,
    explanation: "Capsid là lớp vỏ protein bao bọc vật chất di truyền của virus.",
    level: 'Nhận biết'
  },
  {
    id: 85,
    text: "Vật chất di truyền của virus có thể là?",
    options: ["Chỉ DNA", "Chỉ RNA", "DNA hoặc RNA", "Protein"],
    correctAnswer: 2,
    explanation: "Tùy loại virus mà lõi của chúng là DNA hoặc RNA, mạch đơn hoặc mạch kép.",
    level: 'Nhận biết'
  },
  {
    id: 86,
    text: "Virus có vỏ ngoài (phospholipid) thường gặp ở?",
    options: ["Virus thực vật", "Virus động vật", "Thể thực khuẩn", "Vi khuẩn"],
    correctAnswer: 1,
    explanation: "Nhiều virus động vật lấy màng tế bào chủ làm vỏ ngoài khi thoát ra.",
    level: 'Thông hiểu'
  },
  {
    id: 87,
    text: "Phổ vật chủ của virus là gì?",
    options: ["Nơi virus sống", "Tập hợp các loài sinh vật mà virus có thể lây nhiễm", "Kích thước của virus", "Số lượng virus"],
    correctAnswer: 1,
    explanation: "Mỗi loại virus thường chỉ lây nhiễm được một nhóm vật chủ nhất định.",
    level: 'Nhận biết'
  },
  {
    id: 88,
    text: "Ổ chứa virus là gì?",
    options: ["Cái bình chứa virus", "Nơi virus tồn tại ngoài tự nhiên", "Cơ thể người bệnh", "Phòng thí nghiệm"],
    correctAnswer: 1,
    explanation: "Ổ chứa là nơi virus duy trì sự tồn tại lâu dài trong tự nhiên (ví dụ: động vật hoang dã).",
    level: 'Nhận biết'
  },
  {
    id: 89,
    text: "Các giai đoạn nhân lên của virus gồm mấy bước?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
    explanation: "Gồm 5 bước: Hấp phụ, Xâm nhập, Tổng hợp, Lắp ráp, Giải phóng.",
    level: 'Nhận biết'
  },
  {
    id: 90,
    text: "Giai đoạn virus bám vào thụ thể tế bào chủ là?",
    options: ["Hấp phụ", "Xâm nhập", "Tổng hợp", "Giải phóng"],
    correctAnswer: 0,
    explanation: "Hấp phụ là bước đầu tiên khi virus nhận diện và bám vào bề mặt tế bào chủ.",
    level: 'Nhận biết'
  },
  {
    id: 91,
    text: "Sự tương tác giữa virus và thụ thể tế bào chủ ví như?",
    options: ["Gió thổi", "Nước chảy", "Chìa khóa với ổ khóa", "Nam châm hút sắt"],
    correctAnswer: 2,
    explanation: "Đây là sự tương tác đặc hiệu, virus chỉ bám được vào tế bào có thụ thể tương ứng.",
    level: 'Thông hiểu'
  },
  {
    id: 92,
    text: "Đặc điểm xâm nhập của thể thực khuẩn (Phage)?",
    options: ["Đưa cả hạt vào tế bào", "Tiêm DNA vào trong, vỏ để lại bên ngoài", "Tan màng tế bào", "Dùng cầu sinh chất"],
    correctAnswer: 1,
    explanation: "Phage có cấu tạo đặc biệt giúp chúng bơm vật chất di truyền vào vi khuẩn.",
    level: 'Thông hiểu'
  },
  {
    id: 93,
    text: "Giai đoạn tổng hợp ở virus là làm gì?",
    options: ["Tạo ra các bộ phận (nucleic acid và protein) của virus", "Lắp ráp các hạt", "Giải phóng virus", "Tìm thụ thể"],
    correctAnswer: 0,
    explanation: "Virus sử dụng nguyên liệu của tế bào chủ để chế tạo các thành phần mới.",
    level: 'Thông hiểu'
  },
  {
    id: 94,
    text: "Giải phóng virus theo chu kì sinh tan dẫn đến?",
    options: ["Tế bào chủ vẫn sống", "Phá vỡ (làm chết) tế bào chủ", "Tế bào chủ lớn lên", "Tế bào chủ phân đôi"],
    correctAnswer: 1,
    explanation: "Trong chu kì sinh tan, virus nhân lên ồ ạt và làm tan tế bào chủ để thoát ra.",
    level: 'Thông hiểu'
  },
  {
    id: 95,
    text: "Chu kì tiềm tan là gì?",
    options: ["Virus giết chết tế bào ngay", "DNA virus tích hợp vào hệ gene tế bào chủ và nhân lên cùng tế bào", "Virus không có nucleic acid", "Virus bị tiêu diệt"],
    correctAnswer: 1,
    explanation: "Ở chu kì tiềm tan, virus 'ngủ đông' trong hệ gene tế bào chủ mà không làm tan tế bào.",
    level: 'Thông hiểu'
  },
  {
    id: 96,
    text: "Virus cúm xâm nhập tế bào người bằng cách nào?",
    options: ["Tiêm DNA", "Dung hợp vỏ ngoài với màng sinh chất", "Qua vết thương cơ học", "Thực bào"],
    correctAnswer: 1,
    explanation: "Virus cúm có vỏ ngoài nên có thể dung hợp màng để đưa hạt virus vào trong.",
    level: 'Vận dụng thấp'
  },
  {
    id: 97,
    text: "Virus RNA cần enzyme nào để sao chép ngược?",
    options: ["Amylase", "Protease", "Reverse transcriptase", "Ligase"],
    correctAnswer: 2,
    explanation: "Enzyme phiên mã ngược giúp tổng hợp DNA từ khuôn RNA.",
    level: 'Vận dụng thấp'
  },
  {
    id: 98,
    text: "Tại sao virus chỉ xâm nhập vào một số loại tế bào nhất định?",
    options: ["Do sự tương hợp đặc hiệu giữa phân tử bề mặt virus và thụ thể", "Do kích thước tế bào", "Do nhiệt độ tế bào", "Do vị trí địa lí"],
    correctAnswer: 0,
    explanation: "Tính đặc hiệu của thụ thể quyết định loại tế bào mà virus có thể lây nhiễm.",
    level: 'Thông hiểu'
  },
  {
    id: 99,
    text: "Kích thước virus khoảng bao nhiêu?",
    options: ["20nm - 300nm", "1 micromet", "1 milimet", "1 cm"],
    correctAnswer: 0,
    explanation: "Virus có kích thước siêu hiển vi, đơn vị đo là nanomet.",
    level: 'Nhận biết'
  },
  {
    id: 100,
    text: "Virion là gì?",
    options: ["Hạt virus hoàn chỉnh", "DNA của virus", "Vỏ protein", "Virus bị hỏng"],
    correctAnswer: 0,
    explanation: "Virion là thuật ngữ chỉ một hạt virus hoàn chỉnh nằm ngoài tế bào chủ.",
    level: 'Nhận biết'
  },
  {
    id: 101,
    text: "Tại sao dùng chế phẩm Phage phun lên rau có thể bảo quản lâu?",
    options: ["Vì Phage tiêu diệt vi khuẩn gây hỏng rau", "Vì Phage làm rau xanh hơn", "Vì Phage cung cấp đạm", "Vì Phage ngăn ánh sáng"],
    correctAnswer: 0,
    explanation: "Phage (thể thực khuẩn) có thể tiêu diệt đặc hiệu các vi khuẩn gây thối hỏng rau quả.",
    level: 'Vận dụng cao'
  },
  {
    id: 102,
    text: "Cách ngăn cản virus xâm nhập vào tế bào?",
    options: ["Phá hủy thụ thể tế bào hoặc phân tử bám của virus", "Uống nhiều nước", "Ngủ nhiều", "Tăng nhiệt độ phòng"],
    correctAnswer: 0,
    explanation: "Nếu không có sự gắn kết đặc hiệu giữa thụ thể và virus, quá trình xâm nhập sẽ bị ngăn chặn.",
    level: 'Vận dụng cao'
  },
  {
    id: 103,
    text: "Virus khảm thuốc lá có hình dạng gì?",
    options: ["Hình khối", "Hình xoắn", "Dạng phức tạp", "Hình cầu"],
    correctAnswer: 1,
    explanation: "Virus khảm thuốc lá (TMV) có cấu trúc hình que, đối xứng xoắn.",
    level: 'Nhận biết'
  },
  {
    id: 104,
    text: "Adenovirus có hình dạng gì?",
    options: ["Hình đa diện", "Hình cầu", "Hình xoắn", "Dạng phức tạp"],
    correctAnswer: 0,
    explanation: "Adenovirus có cấu trúc đối xứng khối, hình đa diện 20 mặt.",
    level: 'Nhận biết'
  },
  {
    id: 105,
    text: "Thể thực khuẩn (Phage T4) có hình dạng gì?",
    options: ["Hình đa diện", "Hình xoắn", "Dạng phức tạp", "Hình cầu"],
    correctAnswer: 2,
    explanation: "Phage T4 có cấu tạo phức tạp gồm đầu hình khối và đuôi có cấu trúc xoắn.",
    level: 'Nhận biết'
  },
  {
    id: 106,
    text: "Virus động vật xâm nhập tế bào bằng cách nào?",
    options: ["Chỉ qua vết thương", "Tiêm nucleic acid", "Đưa cả vỏ capsid hoặc dung hợp màng", "Qua cầu sinh chất"],
    correctAnswer: 2,
    explanation: "Virus động vật thường xâm nhập bằng cách thực bào hoặc dung hợp màng sinh chất.",
    level: 'Thông hiểu'
  },
  {
    id: 107,
    text: "Giai đoạn lắp ráp là gì?",
    options: ["Lắp lõi vào vỏ protein", "Phá vỡ tế bào", "Nhân đôi DNA", "Gắn thụ thể"],
    correctAnswer: 0,
    explanation: "Đây là giai đoạn hình thành các hạt virus hoàn chỉnh từ các thành phần đã tổng hợp.",
    level: 'Nhận biết'
  },
  {
    id: 108,
    text: "Virus thực vật lây truyền qua cây khác nhờ?",
    options: ["Tự di chuyển", "Côn trùng chích hút hoặc qua vết thương", "Gió thổi", "Tiếp xúc không khí"],
    correctAnswer: 1,
    explanation: "Do có thành tế bào dày, virus thực vật thường cần vật trung gian hoặc vết thương để xâm nhập.",
    level: 'Thông hiểu'
  },
  {
    id: 109,
    text: "DNA virus thoát khỏi hệ gene tế bào chủ khi nào?",
    options: ["Khi tế bào quá no", "Khi tế bào bị stress (môi trường bất lợi)", "Khi có ánh sáng xanh", "Khi vi khuẩn sinh sản"],
    correctAnswer: 1,
    explanation: "Các yếu tố môi trường bất lợi có thể kích hoạt virus từ trạng thái tiềm tan sang chu kì sinh tan.",
    level: 'Thông hiểu'
  },
  {
    id: 110,
    text: "Chu kì nhân lên của virus gồm?",
    options: ["Hấp phụ, Xâm nhập, Tổng hợp, Lắp ráp, Giải phóng", "Hấp phụ, Tổng hợp, Giải phóng", "Xâm nhập, Lắp ráp", "Sinh sản, Lớn lên"],
    correctAnswer: 0,
    explanation: "Đây là 5 bước cơ bản trong quá trình nhân lên của hầu hết các loại virus.",
    level: 'Nhận biết'
  },
  {
    id: 111,
    text: "HIV là virus gây ra hội chứng gì?",
    options: ["Hội chứng suy giảm miễn dịch mắc phải (AIDS)", "Bệnh dại", "Bệnh cúm", "Bệnh gan"],
    correctAnswer: 0,
    explanation: "HIV làm suy yếu hệ thống miễn dịch, dẫn đến giai đoạn cuối là AIDS.",
    level: 'Nhận biết'
  },
  {
    id: 112,
    text: "Cấu tạo HIV gồm?",
    options: ["2 phân tử RNA, enzyme phiên mã ngược, vỏ capsid và vỏ ngoài", "1 phân tử DNA", "Chỉ có protein", "Thành tế bào dày"],
    correctAnswer: 0,
    explanation: "HIV là virus có vỏ ngoài, lõi chứa 2 phân tử RNA mạch đơn và enzyme đặc hiệu.",
    level: 'Thông hiểu'
  },
  {
    id: 113,
    text: "Tại sao HIV phá hủy hệ miễn dịch?",
    options: ["Nó giết chết hồng cầu", "Nó tấn công tế bào bạch cầu T4 và đại thực bào", "Nó làm hỏng tủy xương", "Nó ngăn hấp thu vitamin"],
    correctAnswer: 1,
    explanation: "Bằng cách phá hủy các tế bào chỉ huy hệ miễn dịch, HIV làm cơ thể mất khả năng tự vệ.",
    level: 'Thông hiểu'
  },
  {
    id: 114,
    text: "HIV lây truyền qua những đường nào?",
    options: ["Máu, tình dục, mẹ sang con", "Hô hấp", "Tiêu hóa", "Muỗi đốt"],
    correctAnswer: 0,
    explanation: "HIV chỉ lây truyền qua các con đường tiếp xúc trực tiếp với dịch cơ thể chứa virus.",
    level: 'Nhận biết'
  },
  {
    id: 115,
    text: "Giai đoạn cửa sổ của HIV kéo dài bao lâu?",
    options: ["2 tuần đến 3 tháng", "1-10 năm", "1 ngày", "50 năm"],
    correctAnswer: 0,
    explanation: "Đây là giai đoạn virus đã xâm nhập nhưng cơ thể chưa kịp tạo ra kháng thể đủ để xét nghiệm thấy.",
    level: 'Thông hiểu'
  },
  {
    id: 116,
    text: "Tại sao người nhiễm HIV giai đoạn cuối thường chết vì bệnh cơ hội?",
    options: ["Do virus HIV trực tiếp giết chết", "Do hệ miễn dịch suy kiệt, không chống lại được mầm bệnh khác", "Do thiếu ngủ", "Do đói"],
    correctAnswer: 1,
    explanation: "Các bệnh thông thường trở nên nguy hiểm tính mạng khi hệ miễn dịch không còn hoạt động.",
    level: 'Thông hiểu'
  },
  {
    id: 117,
    text: "Virus cúm A có vật chất di truyền là?",
    options: ["DNA mạch kép", "7-8 đoạn RNA ngắn", "Chỉ 1 đoạn RNA", "Protein"],
    correctAnswer: 1,
    explanation: "Cấu trúc phân đoạn của RNA giúp virus cúm dễ dàng tái tổ hợp và tạo chủng mới.",
    level: 'Nhận biết'
  },
  {
    id: 118,
    text: "Gai glycoprotein của virus cúm gồm?",
    options: ["Gai H và Gai N", "Gai A và Gai B", "Gai C và Gai D", "Gai X và Gai Y"],
    correctAnswer: 0,
    explanation: "H (Hemagglutinin) và N (Neuraminidase) là hai loại kháng nguyên bề mặt quan trọng của virus cúm.",
    level: 'Nhận biết'
  },
  {
    id: 119,
    text: "Gai H của virus cúm có chức năng gì?",
    options: ["Nhận biết và liên kết với thụ thể tế bào chủ", "Phá hủy tế bào chủ", "Lắp ráp virus", "Sản sinh năng lượng"],
    correctAnswer: 0,
    explanation: "Gai H giúp virus bám dính vào tế bào niêm mạc đường hô hấp.",
    level: 'Thông hiểu'
  },
  {
    id: 120,
    text: "Gai N của virus cúm có chức năng gì?",
    options: ["Bám vào thụ thể", "Enzyme phá hủy tế bào chủ để giải phóng virus", "Tổng hợp RNA", "Tạo vỏ capsid"],
    correctAnswer: 1,
    explanation: "Gai N giúp các hạt virus mới hình thành thoát ra khỏi tế bào chủ.",
    level: 'Thông hiểu'
  },
  {
    id: 121,
    text: "Virus cúm lây truyền qua đường nào?",
    options: ["Đường máu", "Giọt dịch khi hắt hơi, dịch tiết hô hấp", "Quan hệ tình dục", "Qua nước tiểu"],
    correctAnswer: 1,
    explanation: "Cúm lây lan chủ yếu qua đường hô hấp bằng các giọt bắn li ti.",
    level: 'Nhận biết'
  },
  {
    id: 122,
    text: "Tại sao virus cúm dễ phát sinh chủng mới?",
    options: ["Vì nó quá mạnh", "Do enzyme nhân bản RNA hay sai sót và không có khả năng sửa lỗi", "Vì nó sống lâu", "Vì nó có nhiều gai"],
    correctAnswer: 1,
    explanation: "Quá trình sao chép RNA của virus cúm có tỉ lệ đột biến rất cao.",
    level: 'Thông hiểu'
  },
  {
    id: 123,
    text: "Truyền bệnh hàng dọc ở thực vật là?",
    options: ["Từ cây này sang cây khác", "Từ mẹ sang con qua con đường sinh sản", "Qua côn trùng", "Qua dụng cụ làm vườn"],
    correctAnswer: 1,
    explanation: "Lây truyền từ cây mẹ sang cây con qua hạt giống hoặc nhân giống vô tính.",
    level: 'Thông hiểu'
  },
  {
    id: 124,
    text: "Vaccine Jevax dùng để phòng bệnh?",
    options: ["Viêm gan B", "Viêm não Nhật Bản", "Cúm", "Sởi"],
    correctAnswer: 1,
    explanation: "Jevax là vaccine phòng bệnh viêm não Nhật Bản phổ biến tại Việt Nam.",
    level: 'Nhận biết'
  },
  {
    id: 125,
    text: "Thuốc trừ sâu virus thường chứa loại virus nào?",
    options: ["HIV", "Virus Nucleo polyhedrosis (NPV)", "Virus cúm", "Virus khảm"],
    correctAnswer: 1,
    explanation: "NPV là nhóm virus gây bệnh cho nhiều loài sâu hại cây trồng.",
    level: 'Nhận biết'
  },
  {
    id: 126,
    text: "Ưu điểm của thuốc trừ sâu virus?",
    options: ["Tác dụng đặc hiệu, không tiêu diệt côn trùng có lợi, không gây ô nhiễm", "Giá rất rẻ", "Diệt được cả cỏ", "Làm cây lớn nhanh"],
    correctAnswer: 0,
    explanation: "Thuốc trừ sâu sinh học an toàn cho môi trường và con người hơn thuốc hóa học.",
    level: 'Thông hiểu'
  },
  {
    id: 127,
    text: "Liệu pháp gene dùng virus làm gì?",
    options: ["Làm vật trang trí", "Làm vector (thể truyền) để đưa gene lành vào tế bào bệnh", "Để diệt tế bào gốc", "Để nhuộm màu DNA"],
    correctAnswer: 1,
    explanation: "Virus được biến đổi để mang gene điều trị vào cơ thể người.",
    level: 'Thông hiểu'
  },
  {
    id: 128,
    text: "Viroid gây bệnh chủ yếu ở?",
    options: ["Động vật", "Người", "Thực vật (cam, chanh, dừa...)", "Vi khuẩn"],
    correctAnswer: 2,
    explanation: "Viroid là những phân tử RNA vòng nhỏ, không có vỏ protein, chuyên gây bệnh ở cây trồng.",
    level: 'Nhận biết'
  },
  {
    id: 129,
    text: "Prion cấu tạo từ?",
    options: ["Nucleic acid", "Protein", "Lipid", "Carbohydrate"],
    correctAnswer: 1,
    explanation: "Prion là các phân tử protein bị biến đổi cấu trúc và có khả năng gây bệnh.",
    level: 'Nhận biết'
  },
  {
    id: 130,
    text: "Tại sao bệnh bò điên (do Prion) nguy hiểm?",
    options: ["Lây qua đường hô hấp", "Thời gian ủ bệnh rất dài và chưa có thuốc chữa", "Gây chết ngay lập tức", "Chỉ lây ở cỏ"],
    correctAnswer: 1,
    explanation: "Prion phá hủy hệ thần kinh trung ương và hiện chưa có phương pháp điều trị hiệu quả.",
    level: 'Thông hiểu'
  },
  {
    id: 131,
    text: "Tại sao tiêm vaccine cúm định kì mỗi năm?",
    options: ["Vì vaccine hết hạn", "Vì virus cúm đột biến nhanh làm thay đổi kháng nguyên", "Vì cơ thể không nhớ vaccine", "Vì vaccine cũ bị loãng"],
    correctAnswer: 1,
    explanation: "Mỗi năm các chủng cúm lưu hành thường thay đổi nên cần cập nhật vaccine mới.",
    level: 'Vận dụng thấp'
  },
  {
    id: 132,
    text: "Sốt cao khi nhiễm virus là do?",
    options: ["Tế bào bị phá hủy", "Đáp ứng của hệ thống miễn dịch nhằm ngăn chặn virus", "Virus tỏa nhiệt", "Do thời tiết"],
    correctAnswer: 1,
    explanation: "Sốt là phản ứng tự vệ của cơ thể để ức chế sự nhân lên của virus.",
    level: 'Thông hiểu'
  },
  {
    id: 133,
    text: "Biện pháp phòng tránh AIDS quan trọng nhất?",
    options: ["Uống nhiều nước", "Lối sống lành mạnh, quan hệ tình dục an toàn, không dùng chung kim tiêm", "Đeo khẩu trang", "Ăn nhiều rau"],
    correctAnswer: 1,
    explanation: "Ngăn chặn các con đường lây nhiễm là cách phòng ngừa AIDS hiệu quả nhất.",
    level: 'Vận dụng thấp'
  },
  {
    id: 134,
    text: "Virus sọc lá lúa truyền qua?",
    options: ["Rầy nâu", "Muỗi", "Gió", "Nước"],
    correctAnswer: 0,
    explanation: "Rầy nâu là vật trung gian truyền bệnh virus sọc lá lúa nguy hiểm.",
    level: 'Nhận biết'
  },
  {
    id: 135,
    text: "Tại sao quét vôi gốc cây?",
    options: ["Trang trí", "Ngăn côn trùng mang mầm bệnh virus xâm nhập qua vết thương", "Làm cây ấm hơn", "Để cây mau lớn"],
    correctAnswer: 1,
    explanation: "Vôi giúp sát khuẩn và ngăn chặn côn trùng tấn công vào thân cây.",
    level: 'Thông hiểu'
  },
  {
    id: 136,
    text: "Gene-HBvax là vaccine phòng bệnh?",
    options: ["Viêm gan A", "Viêm gan B", "Viêm gan C", "HIV"],
    correctAnswer: 1,
    explanation: "Đây là vaccine tái tổ hợp phòng bệnh viêm gan B.",
    level: 'Nhận biết'
  },
  {
    id: 137,
    text: "Sử dụng Phage để tiêu diệt vi khuẩn gây hỏng rau là ứng dụng của?",
    options: ["Công nghệ nano", "Ứng dụng thể thực khuẩn", "Công nghệ hóa học", "Công nghệ cơ khí"],
    correctAnswer: 1,
    explanation: "Dùng virus ký sinh vi khuẩn để bảo quản nông sản.",
    level: 'Thông hiểu'
  },
  {
    id: 138,
    text: "HIV tích hợp hệ gene vào đâu?",
    options: ["Ti thể", "Lục lạp", "Hệ gene tế bào chủ (NST)", "Ribosome"],
    correctAnswer: 2,
    explanation: "HIV gắn DNA của mình vào nhiễm sắc thể của tế bào bạch cầu vật chủ.",
    level: 'Thông hiểu'
  },
  {
    id: 139,
    text: "Tại sao điều trị AIDS cần dùng nhiều loại thuốc cùng lúc?",
    options: ["Để thuốc mạnh hơn", "Ngăn chặn các dạng đột biến kháng thuốc xuất hiện nhanh", "Để bệnh nhân dễ uống", "Giảm giá thành"],
    correctAnswer: 1,
    explanation: "Phác đồ đa trị liệu giúp kiểm soát virus hiệu quả hơn và tránh kháng thuốc.",
    level: 'Vận dụng thấp'
  },
  {
    id: 140,
    text: "Dịch bệnh SARS-CoV-2 xuất hiện năm?",
    options: ["2015", "2019", "2022", "2010"],
    correctAnswer: 1,
    explanation: "Đại dịch COVID-19 bắt đầu bùng phát từ cuối năm 2019.",
    level: 'Nhận biết'
  },
  {
    id: 141,
    text: "Virus cúm chuyển từ vật này sang vật khác qua cơ chế?",
    options: ["Tái tổ hợp vật chất di truyền khi hai virus cùng xâm nhập một tế bào", "Virus tự học cách bay", "Người nuôi dạy virus", "Do gió thổi virus"],
    correctAnswer: 0,
    explanation: "Sự tái tổ hợp giữa các chủng cúm khác nhau tạo ra các biến thể mới nguy hiểm.",
    level: 'Vận dụng thấp'
  },
  {
    id: 142,
    text: "Dấu hiệu cây bị nhiễm virus?",
    options: ["Lá xoăn, vết đốm vàng/nâu, sinh trưởng chậm", "Cây lớn nhanh", "Lá to hơn", "Hoa nở nhiều hơn"],
    correctAnswer: 0,
    explanation: "Virus làm rối loạn quá trình trao đổi chất và phát triển bình thường của cây.",
    level: 'Thông hiểu'
  },
  {
    id: 143,
    text: "Tại sao không tiếp xúc động vật hoang dã?",
    options: ["Chúng rất dữ", "Chúng có thể là ổ chứa các loại virus mới nguy hiểm", "Chúng có mùi hôi", "Để bảo vệ môi trường"],
    correctAnswer: 1,
    explanation: "Nhiều đại dịch bắt nguồn từ việc virus lây truyền từ động vật hoang dã sang người.",
    level: 'Thông hiểu'
  },
  {
    id: 144,
    text: "Phụ nữ nhiễm HIV mang thai cần làm gì để tránh lây cho con?",
    options: ["Uống thuốc kháng virus trong thai kì và cho con bú theo chỉ định", "Không làm gì", "Uống nhiều sữa", "Tắm nước nóng"],
    correctAnswer: 0,
    explanation: "Điều trị dự phòng giúp giảm thiểu tỉ lệ lây nhiễm từ mẹ sang con xuống mức rất thấp.",
    level: 'Vận dụng thấp'
  },
  {
    id: 145,
    text: "Vector Adenovirus dùng trong?",
    options: ["Sản xuất rượu", "Liệu pháp gene", "Sản xuất sữa chua", "Nhuộm Gram"],
    correctAnswer: 1,
    explanation: "Adenovirus thường được dùng làm vector để đưa gene vào tế bào đích.",
    level: 'Thông hiểu'
  },
  {
    id: 146,
    text: "Muỗi vằn Aedes aegypti là vật trung gian truyền bệnh nào?",
    options: ["Lao", "Sốt xuất huyết", "Cúm", "Dại"],
    correctAnswer: 1,
    explanation: "Đây là loài muỗi truyền virus Dengue gây bệnh sốt xuất huyết.",
    level: 'Nhận biết'
  },
  {
    id: 147,
    text: "Biện pháp hiệu quả nhất diệt muỗi vằn?",
    options: ["Đuổi muỗi", "Vệ sinh môi trường, loại bỏ các dụng cụ chứa nước đọng", "Đóng cửa sổ", "Dùng quạt"],
    correctAnswer: 1,
    explanation: "Loại bỏ nơi sinh sản của muỗi là cách bền vững nhất để kiểm soát dịch bệnh.",
    level: 'Vận dụng thấp'
  },
  {
    id: 148,
    text: "Bệnh dại lây qua?",
    options: ["Không khí", "Vết cắn/cào của động vật bị dại (chó, mèo...)", "Ăn uống", "Bắt tay"],
    correctAnswer: 1,
    explanation: "Virus dại có trong nước bọt của động vật và lây qua vết thương hở.",
    level: 'Nhận biết'
  },
  {
    id: 149,
    text: "Vaccine viêm gan B (Hepadnavirus) thuộc loại vaccine chứa?",
    options: ["RNA", "DNA", "Protein", "Lipid"],
    correctAnswer: 1,
    explanation: "Hepadnavirus là nhóm virus có vật chất di truyền là DNA.",
    level: 'Nhận biết'
  },
  {
    id: 150,
    text: "Bệnh quai bị biểu hiện chủ yếu ở?",
    options: ["Tuyến mang tai", "Bàn chân", "Bàn tay", "Mắt"],
    correctAnswer: 0,
    explanation: "Triệu chứng đặc trưng của quai bị là sưng đau tuyến nước bọt mang tai.",
    level: 'Nhận biết'
  },
  {
    id: 151,
    text: "Bệnh tay-chân-miệng do tác nhân nào gây ra?",
    options: ["Vi khuẩn", "Virus", "Nấm", "Prion"],
    correctAnswer: 1,
    explanation: "Tay-chân-miệng là bệnh truyền nhiễm cấp tính do virus thuộc nhóm Enterovirus gây ra.",
    level: 'Nhận biết'
  },
  {
    id: 152,
    text: "Dịch bệnh 'tai xanh' thường xảy ra ở loài động vật nào?",
    options: ["Lợn", "Gà", "Trâu", "Bò"],
    correctAnswer: 0,
    explanation: "Bệnh tai xanh (PRRS) là bệnh truyền nhiễm nguy hiểm ở lợn.",
    level: 'Nhận biết'
  },
  {
    id: 153,
    text: "Dịch bệnh 'lở mồm long móng' xảy ra ở nhóm động vật nào?",
    options: ["Gia cầm", "Gia súc (trâu, bò, lợn...)", "Chó", "Mèo"],
    correctAnswer: 1,
    explanation: "Đây là bệnh truyền nhiễm do virus gây ra ở các loài động vật móng guốc chẵn.",
    level: 'Nhận biết'
  },
  {
    id: 154,
    text: "Mục đích chính của việc thiết kế tờ rơi tuyên truyền phòng chống dịch bệnh là gì?",
    options: ["Lấy điểm", "Nâng cao nhận thức cộng đồng về phòng chống dịch bệnh", "Để vẽ tranh", "Để quảng cáo thuốc"],
    correctAnswer: 1,
    explanation: "Tuyên truyền giúp người dân hiểu rõ và thực hiện các biện pháp phòng bệnh hiệu quả.",
    level: 'Thông hiểu'
  },
  {
    id: 155,
    text: "Chương trình tiêm chủng mở rộng quốc gia có ý nghĩa gì?",
    options: ["Làm mọi người giàu lên", "Ngăn ngừa các bệnh truyền nhiễm nguy hiểm ở trẻ em", "Giảm dân số", "Tăng chiều cao"],
    correctAnswer: 1,
    explanation: "Tiêm chủng giúp tạo miễn dịch cộng đồng và đẩy lùi nhiều bệnh nguy hiểm.",
    level: 'Thông hiểu'
  },
  {
    id: 156,
    text: "Vi khuẩn nitrat hoá, vi khuẩn oxy hoá hydrogen thuộc kiểu dinh dưỡng nào?",
    options: ["Hoá tự dưỡng", "Hoá dị dưỡng", "Quang tự dưỡng", "Quang dị dưỡng"],
    correctAnswer: 0,
    explanation: "Chúng lấy năng lượng từ các phản ứng hóa học vô cơ và carbon từ CO2.",
    level: 'Thông hiểu'
  },
  {
    id: 157,
    text: "Tảo lục, vi khuẩn lam thuộc kiểu dinh dưỡng nào?",
    options: ["Quang tự dưỡng", "Quang dị dưỡng", "Hoá tự dưỡng", "Hoá dị dưỡng"],
    correctAnswer: 0,
    explanation: "Chúng sử dụng ánh sáng làm năng lượng và CO2 làm nguồn carbon.",
    level: 'Thông hiểu'
  },
  {
    id: 158,
    text: "Vi khuẩn không lưu huỳnh màu lục và tía thuộc kiểu dinh dưỡng nào?",
    options: ["Quang dị dưỡng", "Quang tự dưỡng", "Hoá tự dưỡng", "Hoá dị dưỡng"],
    correctAnswer: 0,
    explanation: "Chúng sử dụng ánh sáng làm năng lượng và chất hữu cơ làm nguồn carbon.",
    level: 'Thông hiểu'
  },
  {
    id: 159,
    text: "Quá trình phân giải đường glucose không có chuỗi truyền electron gọi là gì?",
    options: ["Lên men", "Hô hấp hiếu khí", "Hô hấp kị khí", "Quang hợp"],
    correctAnswer: 0,
    explanation: "Lên men là quá trình phân giải kị khí không có sự tham gia của chuỗi truyền electron.",
    level: 'Thông hiểu'
  },
  {
    id: 160,
    text: "Biệt hoá là quá trình biến đổi tế bào để xây dựng nên thành phần nào?",
    options: ["Mô và cơ quan", "DNA", "RNA", "Vỏ virus"],
    correctAnswer: 0,
    explanation: "Biệt hóa giúp các tế bào chuyên hóa về cấu tạo và chức năng để hình thành mô, cơ quan.",
    level: 'Thông hiểu'
  },
  {
    id: 161,
    text: "Chất nền ngoại bào nằm ở đâu?",
    options: ["Bên trong nhân", "Bên ngoài tế bào động vật", "Trong ti thể", "Trên thành vi khuẩn"],
    correctAnswer: 1,
    explanation: "Chất nền ngoại bào bao quanh các tế bào động vật, giúp liên kết và nâng đỡ.",
    level: 'Nhận biết'
  },
  {
    id: 162,
    text: "Kháng thể là một loại chất gì?",
    options: ["Carbohydrate", "Protein do bạch cầu tiết ra", "Lipid", "Vitamin"],
    correctAnswer: 1,
    explanation: "Kháng thể là các immunoglobulin có bản chất protein giúp chống lại kháng nguyên.",
    level: 'Nhận biết'
  },
  {
    id: 163,
    text: "Môi trường ưu trương làm tế bào vi khuẩn có hiện tượng gì?",
    options: ["Trương nước", "Bị mất nước (co nguyên sinh)", "Không đổi", "Nổ tung"],
    correctAnswer: 1,
    explanation: "Nồng độ chất tan bên ngoài cao hơn bên trong làm nước thoát ra ngoài tế bào.",
    level: 'Thông hiểu'
  },
  {
    id: 164,
    text: "Môi trường nhược trương làm tế bào vi khuẩn có hiện tượng gì?",
    options: ["Hút nước từ môi trường", "Mất nước", "Héo đi", "Biến mất"],
    correctAnswer: 0,
    explanation: "Nước từ môi trường có nồng độ thấp hơn sẽ đi vào bên trong tế bào.",
    level: 'Thông hiểu'
  },
  {
    id: 165,
    text: "Sự khác biệt chính của vi sinh vật quang dị dưỡng và quang tự dưỡng là gì?",
    options: ["Nguồn năng lượng", "Nguồn carbon", "Nguồn oxy", "Kích thước"],
    correctAnswer: 1,
    explanation: "Cả hai đều dùng ánh sáng nhưng tự dưỡng dùng CO2, dị dưỡng dùng chất hữu cơ.",
    level: 'Thông hiểu'
  }
];

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [view, setView] = useState<'login' | 'landing' | 'study' | 'quiz' | 'result'>('login');
  const [userRole, setUserRole] = useState<'none' | 'student' | 'teacher'>(() => (localStorage.getItem('bio_user_role') as any) || 'none');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(LESSONS[0].id);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [studentName, setStudentName] = useState(() => localStorage.getItem('bio_student_name') || '');
  const [googleTokens, setGoogleTokens] = useState<any>(null);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(localStorage.getItem('bio_spreadsheet_id'));
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isServerConnected, setIsServerConnected] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isTeacher, setIsTeacher] = useState(() => localStorage.getItem('bio_is_teacher') === 'true');
  const [showTeacherLogin, setShowTeacherLogin] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [history, setHistory] = useState<{ name: string; score: number; date: string }[]>(() => {
    const saved = localStorage.getItem('bio_quiz_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (userRole !== 'none' && view === 'login') {
      setView('landing');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bio_user_role', userRole);
    localStorage.setItem('bio_student_name', studentName);
    localStorage.setItem('bio_is_teacher', isTeacher.toString());
  }, [userRole, studentName, isTeacher]);

  useEffect(() => {
    localStorage.setItem('bio_quiz_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
        setGoogleTokens(event.data.tokens);
        localStorage.setItem('google_tokens', JSON.stringify(event.data.tokens));
        setIsServerConnected(true);
      }
    };
    window.addEventListener('message', handleMessage);
    
    const savedTokens = localStorage.getItem('google_tokens');
    if (savedTokens) {
      setGoogleTokens(JSON.parse(savedTokens));
    }

    // Check server connection status
    fetch('/api/sheets/status')
      .then(res => res.json())
      .then(data => {
        setIsServerConnected(data.connected);
        if (data.spreadsheetId && !spreadsheetId) {
          setSpreadsheetId(data.spreadsheetId);
          localStorage.setItem('bio_spreadsheet_id', data.spreadsheetId);
        }
      })
      .catch(err => console.error('Failed to check sheets status', err));

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleConnectGoogle = async () => {
    try {
      const response = await fetch('/api/auth/url');
      const { url } = await response.json();
      window.open(url, 'google_auth', 'width=600,height=700');
    } catch (error) {
      console.error('Failed to get auth URL', error);
    }
  };

  const handleLogout = () => {
    setGoogleTokens(null);
    localStorage.removeItem('google_tokens');
    localStorage.removeItem('bio_user_role');
    localStorage.removeItem('bio_student_name');
    localStorage.removeItem('bio_is_teacher');
    setUserRole('none');
    setStudentName('');
    setIsTeacher(false);
    setLoginUser('');
    setLoginPass('');
    setView('login');
  };

  const startQuiz = () => {
    // Select 20 questions based on levels
    const levels = {
      'Nhận biết': 8,
      'Thông hiểu': 6,
      'Vận dụng thấp': 4,
      'Vận dụng cao': 2
    };

    let selected: Question[] = [];
    
    Object.entries(levels).forEach(([level, count]) => {
      const levelQuestions = SAMPLE_QUESTIONS.filter(q => q.level === level);
      const shuffled = [...levelQuestions].sort(() => 0.5 - Math.random());
      selected = [...selected, ...shuffled.slice(0, count)];
    });

    // If for some reason we don't have 20 (e.g. not enough questions in a level), 
    // fill with random remaining questions
    if (selected.length < 20) {
      const remaining = SAMPLE_QUESTIONS.filter(q => !selected.find(s => s.id === q.id));
      const shuffledRemaining = [...remaining].sort(() => 0.5 - Math.random());
      selected = [...selected, ...shuffledRemaining.slice(0, 20 - selected.length)];
    }

    // Final shuffle of the 20 questions
    setQuizQuestions(selected.sort(() => 0.5 - Math.random()));
    
    setView('quiz');
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizResult(null);
    setSaveStatus('idle');
  };

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const submitQuiz = async () => {
    let correctCount = 0;
    const answers = quizQuestions.map(q => {
      const selected = selectedAnswers[q.id];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selectedOption: selected,
        isCorrect
      };
    });

    const result: QuizResult = {
      score: (correctCount / quizQuestions.length) * 10,
      correctCount,
      totalCount: quizQuestions.length,
      answers
    };

    setQuizResult(result);
    setView('result');

    // Add to local history
    setHistory(prev => [{
      name: studentName,
      score: result.score,
      date: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }, ...prev].slice(0, 10)); // Keep last 10

    // Auto-save to Google Sheets if connected
    if (googleTokens || isServerConnected) {
      console.log('Triggering auto-save...');
      saveToSheets(result);
    }
  };

  const saveToSheets = async (result: QuizResult) => {
    if (!googleTokens && !isServerConnected) return;
    
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      const response = await fetch('/api/sheets/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokens: googleTokens, // Server will use its own if this is null
          spreadsheetId: localStorage.getItem('bio_spreadsheet_id'), // Use latest from storage
          data: [
            new Date().toLocaleString('vi-VN'),
            studentName,
            result.score.toFixed(1),
            result.correctCount,
            result.totalCount
          ]
        })
      });

      const data = await response.json();
      if (data.success) {
        setSaveStatus('success');
        if (data.spreadsheetId) {
          setSpreadsheetId(data.spreadsheetId);
          localStorage.setItem('bio_spreadsheet_id', data.spreadsheetId);
        }
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => userRole !== 'none' && setView('landing')}>
          <div className="bg-emerald-600 p-2 rounded-lg">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold text-slate-800 leading-none">Sinh học 4.0</span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Cô Kiều Thị Kim Thu</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {userRole !== 'none' && (
            <div className="flex items-center gap-4 mr-4 pr-4 border-r border-slate-200">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {userRole === 'teacher' ? 'Giáo viên' : 'Học sinh'}
                </span>
                <span className="text-sm font-bold text-slate-700">{studentName || 'GV001'}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-colors"
                title="Đăng xuất"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}

          {(googleTokens || isServerConnected) ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {isServerConnected ? 'Hệ thống đã kết nối' : 'Đã kết nối Sheets'}
                </span>
                <span className="text-sm font-semibold text-emerald-600">Google Sheets</span>
              </div>
              {userRole === 'teacher' && (
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              )}
            </div>
          ) : (
            userRole === 'teacher' && (
              <button 
                onClick={handleConnectGoogle}
                className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-50 transition-all shadow-sm"
              >
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Kết nối Google Sheets</span>
              </button>
            )
          )}
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className={cn("lg:col-span-8", (view === 'quiz' || view === 'login') && "lg:col-span-12")}>
          <AnimatePresence mode="wait">
            {view === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-md mx-auto py-20"
              >
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 text-center">
                  <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-600/20">
                    <GraduationCap className="text-white w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Xin chào!</h2>
                  <p className="text-slate-500 mb-6">Vui lòng chọn vai trò của bạn để bắt đầu</p>

                  {isServerConnected && (
                    <div className="mb-8 inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Hệ thống đã kết nối Google Sheets</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4">
                    <button
                      onClick={() => {
                        setShowTeacherLogin(false);
                        setLoginError(false);
                        setLoginUser('');
                        setLoginPass('');
                      }}
                      className={cn(
                        "group p-6 rounded-3xl border-2 transition-all text-left flex items-center gap-4",
                        userRole === 'student' || (!showTeacherLogin && userRole === 'none') ? "border-emerald-500 bg-emerald-50/50" : "border-slate-100 hover:border-slate-200"
                      )}
                    >
                      <div className="bg-white p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                        <User className="text-emerald-600 w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Học sinh</h4>
                        <p className="text-xs text-slate-500">Đăng nhập tài khoản HS</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setShowTeacherLogin(true);
                        setLoginError(false);
                        setLoginUser('');
                        setLoginPass('');
                      }}
                      className={cn(
                        "group p-6 rounded-3xl border-2 transition-all text-left flex items-center gap-4",
                        showTeacherLogin ? "border-blue-500 bg-blue-50/50" : "border-slate-100 hover:border-slate-200"
                      )}
                    >
                      <div className="bg-white p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                        <ShieldCheck className="text-blue-600 w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Giáo viên</h4>
                        <p className="text-xs text-slate-500">Quản lý và xem kết quả</p>
                      </div>
                    </button>
                  </div>

                  {(!showTeacherLogin && userRole !== 'teacher') && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-100"
                    >
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Tài khoản (VD: HS001)"
                          value={loginUser}
                          onChange={(e) => setLoginUser(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          type="password"
                          placeholder="Mật khẩu"
                          value={loginPass}
                          onChange={(e) => setLoginPass(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          type="text"
                          placeholder="Họ và tên học sinh"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      {loginError && <p className="text-xs text-red-500 font-bold">Tài khoản hoặc mật khẩu không đúng</p>}
                      <button
                        onClick={() => {
                          const account = STUDENT_ACCOUNTS.find(a => a.username === loginUser && a.password === loginPass);
                          if (account && studentName.trim()) {
                            setIsTeacher(false);
                            setUserRole('student');
                            setView('landing');
                            setLoginError(false);
                          } else if (!studentName.trim()) {
                            alert('Vui lòng nhập họ và tên');
                          } else {
                            setLoginError(true);
                          }
                        }}
                        className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                      >
                        Đăng nhập Học sinh
                      </button>
                    </motion.div>
                  )}

                  {showTeacherLogin && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 space-y-3 bg-slate-50 p-6 rounded-3xl border border-slate-100"
                    >
                      <input
                        type="text"
                        placeholder="Tài khoản Giáo viên"
                        value={loginUser}
                        onChange={(e) => setLoginUser(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {loginError && <p className="text-xs text-red-500 font-bold">Sai tài khoản hoặc mật khẩu</p>}
                      <button
                        onClick={() => {
                          if (loginUser === TEACHER_ACCOUNT.username && loginPass === TEACHER_ACCOUNT.password) {
                            setIsTeacher(true);
                            setUserRole('teacher');
                            setStudentName('Giáo viên');
                            setView('landing');
                            setLoginError(false);
                          } else {
                            setLoginError(true);
                          }
                        }}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
                      >
                        Đăng nhập Giáo viên
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Học lý thuyết card for guests */}
                <div className="mt-8 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 text-left group">
                  <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen className="text-blue-600 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3">Học lý thuyết</h3>
                  <p className="text-slate-600 mb-6">Ôn tập các kiến thức trọng tâm về đặc điểm, dinh dưỡng và sinh trưởng của vi sinh vật.</p>
                  <button 
                    onClick={() => setView('study')}
                    className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                  >
                    Bắt đầu học <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {view === 'landing' && (
              <motion.div 
                key="landing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12 py-12"
              >
                <div className="text-center space-y-4">
                  <h1 className="text-5xl font-serif font-bold text-slate-900 leading-tight">
                    Sinh học 4.0 <br />
                    <span className="text-emerald-600">THPT DƯƠNG XÁ</span>
                  </h1>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Hệ thống học tập và kiểm tra kiến thức môn Sinh học lớp 10. <br/>
                    <span className="font-medium text-slate-500">Tác giả: Cô Kiều Thị Kim Thu</span>
                  </p>
                  {isServerConnected && (
                    <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Hệ thống đã sẵn sàng lưu điểm</span>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <BookOpen className="text-blue-600 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-3">Học lý thuyết</h3>
                    <p className="text-slate-600 mb-6">Ôn tập các kiến thức trọng tâm về đặc điểm, dinh dưỡng và sinh trưởng của vi sinh vật.</p>
                    <button 
                      onClick={() => setView('study')}
                      className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                    >
                      Bắt đầu học <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <ClipboardCheck className="text-emerald-600 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-3">Làm bài kiểm tra</h3>
                    <p className="text-slate-600 mb-6">Kiểm tra mức độ hiểu bài của bạn với bộ câu hỏi trắc nghiệm đa dạng.</p>
                    
                    <div className="space-y-4">
                      {userRole === 'student' ? (
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
                          <User className="text-emerald-600 w-5 h-5" />
                          <span className="font-bold text-emerald-700">{studentName}</span>
                        </div>
                      ) : (
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="Nhập tên để làm thử..."
                            value={studentName === 'Giáo viên' ? '' : studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                          />
                        </div>
                      )}
                      <button 
                        onClick={startQuiz}
                        className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
                      >
                        Bắt đầu kiểm tra
                      </button>
                    </div>
                  </div>
                </div>

                {!googleTokens && !isServerConnected && (
                  <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-start gap-4">
                    <AlertCircle className="text-amber-600 w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-amber-900">Lưu ý về kết quả</h4>
                      <p className="text-amber-800 text-sm">
                        Hệ thống chưa được kết nối với Google Sheets. Kết quả bài kiểm tra sẽ không được lưu lại tự động. 
                        {userRole === 'teacher' ? ' Hãy kết nối ở góc trên bên phải để lưu điểm số.' : ' Vui lòng báo giáo viên kết nối hệ thống.'}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {view === 'study' && (
              <motion.div 
                key="study"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="py-8"
              >
                <button 
                  onClick={() => setView('landing')}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Quay lại trang chủ
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Lesson Menu */}
                  <div className="md:col-span-3 space-y-2">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Danh sách bài học</h3>
                    {LESSONS.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLessonId(lesson.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all",
                          selectedLessonId === lesson.id
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                            : "text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {lesson.title}
                      </button>
                    ))}
                  </div>

                  {/* Lesson Content */}
                  <div className="md:col-span-9">
                    <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
                      <div className="markdown-body">
                        <ReactMarkdown>
                          {LESSONS.find(l => l.id === selectedLessonId)?.content || ''}
                        </ReactMarkdown>
                      </div>
                      
                      <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                        <p className="text-slate-500 italic">Chúc bạn học tập tốt!</p>
                        <button 
                          onClick={() => setView('landing')}
                          className="bg-slate-900 text-white px-6 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors"
                        >
                          Xong, quay lại
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {view === 'quiz' && (
              <motion.div 
                key="quiz"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Bài kiểm tra Vi sinh vật</h2>
                    <p className="text-slate-500">Học sinh: <span className="font-semibold text-slate-700">{studentName}</span></p>
                  </div>
                  <div className="bg-slate-100 px-4 py-2 rounded-full text-sm font-bold text-slate-600">
                    Câu {currentQuestionIndex + 1} / {quizQuestions.length}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="mb-8">
                    <h3 className="text-xl font-medium text-slate-900 leading-relaxed">
                      {quizQuestions[currentQuestionIndex].text}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {quizQuestions[currentQuestionIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(quizQuestions[currentQuestionIndex].id, idx)}
                        className={cn(
                          "w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between group",
                          selectedAnswers[quizQuestions[currentQuestionIndex].id] === idx
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                        )}
                      >
                        <span className={cn(
                          "font-medium",
                          selectedAnswers[quizQuestions[currentQuestionIndex].id] === idx ? "text-emerald-700" : "text-slate-700"
                        )}>
                          {String.fromCharCode(65 + idx)}. {option}
                        </span>
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                          selectedAnswers[quizQuestions[currentQuestionIndex].id] === idx
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-slate-200 group-hover:border-slate-300"
                        )}>
                          {selectedAnswers[quizQuestions[currentQuestionIndex].id] === idx && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-10 flex justify-between">
                    <button
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                      className="px-6 py-2 rounded-xl font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-30 transition-all"
                    >
                      Câu trước
                    </button>
                    
                    {currentQuestionIndex === quizQuestions.length - 1 ? (
                      <button
                        onClick={submitQuiz}
                        className="bg-emerald-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                      >
                        Nộp bài
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="bg-slate-900 text-white px-8 py-2 rounded-xl font-bold hover:bg-slate-800 transition-all"
                      >
                        Tiếp theo
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {view === 'result' && quizResult && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 space-y-8"
              >
                <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
                  <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-6" />
                  <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Kết quả của bạn</h2>
                  <p className="text-slate-500 mb-8">Học sinh: <span className="font-semibold text-slate-700">{studentName}</span></p>
                  
                  <div className="flex justify-center gap-12 mb-10">
                    <div className="text-center">
                      <div className="text-5xl font-serif font-bold text-emerald-600">{quizResult.score.toFixed(1)}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Điểm số</div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-serif font-bold text-slate-800">{quizResult.correctCount}/{quizResult.totalCount}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Số câu đúng</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => setView('landing')}
                      className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" /> Làm lại
                    </button>
                    
                    {googleTokens && (
                      <div className={cn(
                        "flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all",
                        saveStatus === 'success' ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : 
                        saveStatus === 'error' ? "bg-red-50 text-red-600 border border-red-100" :
                        "bg-slate-100 text-slate-600 border border-slate-200"
                      )}>
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                            <span>Đang tự động lưu...</span>
                          </>
                        ) : saveStatus === 'success' ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> <span>Đã tự động lưu</span>
                          </>
                        ) : saveStatus === 'error' ? (
                          <button onClick={() => saveToSheets(quizResult)} className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" /> <span>Lỗi lưu bài. Thử lại?</span>
                          </button>
                        ) : (
                          <span>Chờ lưu bài...</span>
                        )}
                      </div>
                    )}
                  </div>

                  {saveStatus === 'success' && spreadsheetId && (
                    <div className="mt-6">
                      <a 
                        href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-emerald-600 hover:underline inline-flex items-center gap-1"
                      >
                        Xem bảng điểm trên Google Sheets <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-serif font-bold text-slate-800 px-4">Chi tiết bài làm</h3>
                  {quizQuestions.map((q, idx) => {
                    const answer = quizResult.answers.find(a => a.questionId === q.id);
                    return (
                      <div key={q.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <div className="flex items-start gap-4 mb-6">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 font-bold",
                            answer?.isCorrect ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                          )}>
                            {answer?.isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-slate-900 leading-relaxed">
                              Câu {idx + 1}: {q.text}
                            </h4>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                          {q.options.map((opt, oIdx) => (
                            <div 
                              key={oIdx}
                              className={cn(
                                "p-3 rounded-xl border text-sm",
                                oIdx === q.correctAnswer 
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-medium" 
                                  : oIdx === answer?.selectedOption && !answer.isCorrect
                                  ? "bg-red-50 border-red-200 text-red-700"
                                  : "bg-slate-50 border-slate-100 text-slate-500"
                              )}
                            >
                              {String.fromCharCode(65 + oIdx)}. {opt}
                              {oIdx === q.correctAnswer && <span className="ml-2 text-[10px] uppercase font-bold tracking-wider">(Đáp án đúng)</span>}
                              {oIdx === answer?.selectedOption && !answer.isCorrect && <span className="ml-2 text-[10px] uppercase font-bold tracking-wider">(Bạn chọn)</span>}
                            </div>
                          ))}
                        </div>

                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
                            <BookOpen className="w-3 h-3" /> Giải thích
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar - History */}
        {view !== 'quiz' && (
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-serif font-bold text-lg">Bảng điểm vinh danh</h3>
              </div>

              {history.length > 0 ? (
                <div className="space-y-4">
                  {history.map((item, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={idx} 
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 truncate max-w-[120px]">{item.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "px-3 py-1 rounded-full text-sm font-bold",
                          item.score >= 8 ? "bg-emerald-100 text-emerald-700" :
                          item.score >= 5 ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        )}>
                          {item.score.toFixed(1)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LayoutDashboard className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-slate-400 text-sm">Chưa có kết quả nào được ghi nhận.</p>
                </div>
              )}

              {userRole === 'teacher' && (
                <div className="mt-6 border-t border-slate-100 pt-6">
                  {showDeleteConfirm ? (
                    <div className="flex flex-col gap-2">
                      <p className="text-[10px] text-red-500 font-bold text-center uppercase tracking-wider">Xác nhận xóa toàn bộ?</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setHistory([]);
                            setShowDeleteConfirm(false);
                          }}
                          className="flex-1 bg-red-500 text-white text-[10px] font-bold py-2 rounded-lg hover:bg-red-600 transition-colors uppercase"
                        >
                          Xóa ngay
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(false)}
                          className="flex-1 bg-slate-100 text-slate-600 text-[10px] font-bold py-2 rounded-lg hover:bg-slate-200 transition-colors uppercase"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full bg-red-50 text-red-600 text-xs font-bold py-2 rounded-xl hover:bg-red-100 transition-colors uppercase tracking-widest"
                    >
                      Xóa lịch sử
                    </button>
                  )}
                </div>
              )}
            </div>
          </aside>
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-8 px-6 text-center">
        <p className="text-slate-400 text-sm">
          © 2026 Sinh học 4.0 THPT DƯƠNG XÁ. Tác giả: Cô Kiều Thị Kim Thu.
        </p>
      </footer>
    </div>
  );
}
