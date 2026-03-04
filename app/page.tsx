"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { BookOpen, Languages, Sparkles } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const nounLessons = [
  {
    unit: "Unit 4.1",
    title: "Phương hướng, phương tiện, địa danh",
    items: [
      { jp: "きた", vi: "Bắc", romaji: "kita" },
      { jp: "みなみ", vi: "Nam", romaji: "minami" },
      { jp: "ひがし", vi: "Đông", romaji: "higashi" },
      { jp: "にし", vi: "Tây", romaji: "nishi" },
      { jp: "まんなか", vi: "Chính giữa", romaji: "mannaka" },
      { jp: "くるま", vi: "Xe hơi", romaji: "kuruma" },
      { jp: "しんかんせん", vi: "Tàu cao tốc", romaji: "shinkansen" },
      { jp: "でんしゃ", vi: "Tàu điện", romaji: "densha" },
      { jp: "ひこうき", vi: "Máy bay", romaji: "hikouki" },
      { jp: "えき", vi: "Nhà ga", romaji: "eki" },
      { jp: "まち", vi: "Thị trấn / thành phố", romaji: "machi" },
      { jp: "バンコク", vi: "Bangkok", romaji: "bankoku" },
      { jp: "シドニー", vi: "Sydney", romaji: "shidonii" },
      { jp: "ハノイ", vi: "Hà Nội", romaji: "hanoi" },
      { jp: "ホーチミンし", vi: "TP. Hồ Chí Minh", romaji: "hoochiminshi" },
      { jp: "モスクワ", vi: "Moscow", romaji: "mosukuwa" },
    ],
  },
  {
    unit: "Unit 4.2",
    title: "Địa điểm, cảnh quan, tính chất nơi chốn",
    items: [
      { jp: "おんせん", vi: "Suối nước nóng", romaji: "onsen" },
      { jp: "かわ", vi: "Sông", romaji: "kawa" },
      { jp: "やま", vi: "Núi", romaji: "yama" },
      { jp: "きょうかい", vi: "Nhà thờ", romaji: "kyoukai" },
      { jp: "おしろ", vi: "Lâu đài", romaji: "oshiro" },
      { jp: "じんじゃ", vi: "Đền", romaji: "jinja" },
      { jp: "おてら", vi: "Chùa", romaji: "otera" },
      { jp: "ビル", vi: "Tòa nhà", romaji: "biru" },
      { jp: "ところ", vi: "Nơi, chỗ", romaji: "tokoro" },
      { jp: "ひと", vi: "Người", romaji: "hito" },
      { jp: "みどり", vi: "Màu xanh / cây xanh", romaji: "midori" },
      { jp: "ふじさん", vi: "Núi Phú Sĩ", romaji: "fujisan" },
      { jp: "ほうりゅうじ", vi: "Chùa Horyuji", romaji: "houryuuji" },
      { jp: "ひめじじょう", vi: "Lâu đài Himeji", romaji: "himejijou" },
    ],
  },
  {
    unit: "Unit 4.3",
    title: "Thời tiết, vị giác, mùa",
    items: [
      { jp: "あめ", vi: "Mưa", romaji: "ame" },
      { jp: "ゆき", vi: "Tuyết", romaji: "yuki" },
      { jp: "ひ", vi: "Ngày / mặt trời", romaji: "hi" },
      { jp: "メロン", vi: "Dưa gang", romaji: "meron" },
      { jp: "てんき", vi: "Thời tiết", romaji: "tenki" },
      { jp: "きせつ", vi: "Mùa", romaji: "kisetsu" },
      { jp: "いちねんじゅう", vi: "Suốt một năm", romaji: "ichinenjuu" },
    ],
  },
  {
    unit: "Unit 5.1",
    title: "Thời gian tuần, nhà cửa, quan hệ",
    items: [
      { jp: "いっしゅうかん", vi: "Suốt 1 tuần", romaji: "isshuukan" },
      { jp: "おととい", vi: "Hôm kia", romaji: "ototoi" },
      { jp: "きのう", vi: "Hôm qua", romaji: "kinou" },
      { jp: "きょう", vi: "Hôm nay", romaji: "kyou" },
      { jp: "あした", vi: "Ngày mai", romaji: "ashita" },
      { jp: "あさって", vi: "Ngày mốt", romaji: "asatte" },
      { jp: "しゅうまつ", vi: "Cuối tuần", romaji: "shuumatsu" },
      { jp: "せんしゅう", vi: "Tuần trước", romaji: "senshuu" },
      { jp: "こんしゅう", vi: "Tuần này", romaji: "konshuu" },
      { jp: "らいしゅう", vi: "Tuần sau", romaji: "raishuu" },
      { jp: "いえ", vi: "Nhà", romaji: "ie" },
      { jp: "へや", vi: "Phòng", romaji: "heya" },
      { jp: "アパート", vi: "Chung cư", romaji: "apaato" },
      { jp: "びじゅつかん", vi: "Bảo tàng mỹ thuật", romaji: "bijutsukan" },
      { jp: "かぞく", vi: "Gia đình", romaji: "kazoku" },
      { jp: "こいびと", vi: "Người yêu", romaji: "koibito" },
      { jp: "ともだち", vi: "Bạn bè", romaji: "tomodachi" },
      { jp: "ルームメイト", vi: "Bạn cùng phòng", romaji: "ruumumeito" },
    ],
  },
  {
    unit: "Unit 5.2",
    title: "Mốc tháng năm, sinh hoạt, sức khỏe",
    items: [
      { jp: "せんげつ", vi: "Tháng trước", romaji: "sengetsu" },
      { jp: "こんげつ", vi: "Tháng này", romaji: "kongetsu" },
      { jp: "らいげつ", vi: "Tháng sau", romaji: "raigetsu" },
      { jp: "きょねん", vi: "Năm ngoái", romaji: "kyonen" },
      { jp: "ことし", vi: "Năm nay", romaji: "kotoshi" },
      { jp: "らいねん", vi: "Năm sau", romaji: "rainen" },
      { jp: "けさ", vi: "Sáng nay", romaji: "kesa" },
      { jp: "こんばん", vi: "Tối nay", romaji: "konban" },
      { jp: "かぜ", vi: "Cảm cúm", romaji: "kaze" },
      { jp: "あさごはん", vi: "Cơm sáng", romaji: "asagohan" },
      { jp: "ひるごはん", vi: "Cơm trưa", romaji: "hirugohan" },
      { jp: "ばんごはん", vi: "Cơm tối", romaji: "bangohan" },
      { jp: "ふく", vi: "Quần áo", romaji: "fuku" },
    ],
  },
  {
    unit: "Unit 5.3",
    title: "Sở thích, hình ảnh, đồ vật",
    items: [
      { jp: "こんど", vi: "Lần tới", romaji: "kondo" },
      { jp: "アニメ", vi: "Hoạt hình", romaji: "anime" },
      { jp: "え", vi: "Bức tranh", romaji: "e" },
      { jp: "けしき", vi: "Phong cảnh", romaji: "keshiki" },
      { jp: "じてんしゃ", vi: "Xe đạp", romaji: "jitensha" },
      { jp: "しゃしん", vi: "Bức ảnh", romaji: "shashin" },
      { jp: "サカイでんき", vi: "Công ty Sakai", romaji: "sakaidenki" },
      { jp: "ニコニコショッピング", vi: "Cửa hàng Nikoniko", romaji: "nikonikoshoppingu" },
      { jp: "うえの", vi: "Ueno", romaji: "ueno" },
    ],
  },
  {
    unit: "Unit 6.1",
    title: "Sự kiện, hoạt động giải trí",
    items: [
      { jp: "カラオケ", vi: "Karaoke", romaji: "karaoke" },
      { jp: "コンサート", vi: "Hòa nhạc", romaji: "konsaato" },
      { jp: "しあい", vi: "Trận đấu", romaji: "shiai" },
      { jp: "セール", vi: "Giảm giá", romaji: "seeru" },
      { jp: "チケット", vi: "Vé", romaji: "chiketto" },
      { jp: "ちず", vi: "Bản đồ", romaji: "chizu" },
      { jp: "みずぎ", vi: "Đồ bơi", romaji: "mizugi" },
      { jp: "やきゅう", vi: "Bóng chày", romaji: "yakyuu" },
      { jp: "やくそく", vi: "Cuộc hẹn", romaji: "yakusoku" },
      { jp: "ようじ", vi: "Việc bận", romaji: "youji" },
    ],
  },
  {
    unit: "Unit 6.2",
    title: "Đồ ăn uống, di chuyển, so sánh",
    items: [
      { jp: "たべもの", vi: "Đồ ăn", romaji: "tabemono" },
      { jp: "のみもの", vi: "Đồ uống", romaji: "nomimono" },
      { jp: "やきにく", vi: "Thịt nướng", romaji: "yakiniku" },
      { jp: "ラーメン", vi: "Mì ramen", romaji: "raamen" },
      { jp: "たべほうだい", vi: "Ăn buffet", romaji: "tabehoudai" },
      { jp: "いざかや", vi: "Quán rượu", romaji: "izakaya" },
      { jp: "えいがかん", vi: "Rạp phim", romaji: "eigakan" },
      { jp: "ちかてつ", vi: "Tàu điện ngầm", romaji: "chikatetsu" },
      { jp: "かしゅ", vi: "Ca sĩ", romaji: "kashu" },
      { jp: "コメディー", vi: "Hài kịch", romaji: "komedii" },
      { jp: "ジャズ", vi: "Nhạc jazz", romaji: "jazu" },
      { jp: "ツアー", vi: "Tour du lịch", romaji: "tsuaa" },
    ],
  },
  {
    unit: "Unit 6.3",
    title: "Ẩm thực Nhật",
    items: [
      { jp: "おこのみやき", vi: "Bánh xèo Nhật", romaji: "okonomiyaki" },
      { jp: "すきやき", vi: "Lẩu sukiyaki", romaji: "sukiyaki" },
    ],
  },
  {
    unit: "Unit 7.1",
    title: "Vị trí trong không gian, địa điểm quanh ga",
    items: [
      { jp: "かいさつ", vi: "Máy soát vé", romaji: "kaisatsu" },
      { jp: "き", vi: "Cây", romaji: "ki" },
      { jp: "こうばん", vi: "Đồn công an", romaji: "kouban" },
      { jp: "じどうはんばいき", vi: "Máy bán hàng tự động", romaji: "jidouhanbaiki" },
      { jp: "バスてい", vi: "Trạm xe buýt", romaji: "basutei" },
      { jp: "ポスト", vi: "Hòm thư", romaji: "posuto" },
      { jp: "はな", vi: "Hoa", romaji: "hana" },
      { jp: "いぬ", vi: "Chó", romaji: "inu" },
      { jp: "となり", vi: "Bên cạnh", romaji: "tonari" },
      { jp: "ちかく", vi: "Ở gần", romaji: "chikaku" },
      { jp: "あいだ", vi: "Ở giữa", romaji: "aida" },
      { jp: "うえ", vi: "Ở trên", romaji: "ue" },
      { jp: "した", vi: "Ở dưới", romaji: "shita" },
      { jp: "なか", vi: "Ở trong", romaji: "naka" },
      { jp: "そと", vi: "Ở ngoài", romaji: "soto" },
      { jp: "まえ", vi: "Phía trước", romaji: "mae" },
      { jp: "うしろ", vi: "Phía sau", romaji: "ushiro" },
    ],
  },
  {
    unit: "Unit 7.2",
    title: "Đồ dùng trong nhà, bếp và lớp học",
    items: [
      { jp: "じゅんび", vi: "Chuẩn bị", romaji: "junbi" },
      { jp: "いす", vi: "Ghế", romaji: "isu" },
      { jp: "テーブル", vi: "Bàn", romaji: "teeburu" },
      { jp: "つくえ", vi: "Bàn học/làm việc", romaji: "tsukue" },
      { jp: "ソファー", vi: "Ghế sofa", romaji: "sofaa" },
      { jp: "でんしレンジ", vi: "Lò vi sóng", romaji: "denshirenji" },
      { jp: "れいぞうこ", vi: "Tủ lạnh", romaji: "reizouko" },
      { jp: "さとう", vi: "Đường", romaji: "satou" },
      { jp: "しお", vi: "Muối", romaji: "shio" },
      { jp: "しょうゆ", vi: "Nước tương", romaji: "shouyu" },
      { jp: "コップ", vi: "Ly", romaji: "koppu" },
      { jp: "スプーン", vi: "Muỗng", romaji: "supuun" },
      { jp: "ナイフ", vi: "Dao", romaji: "naifu" },
      { jp: "フォーク", vi: "Nĩa", romaji: "fooku" },
      { jp: "はし", vi: "Đũa", romaji: "hashi" },
      { jp: "て", vi: "Tay", romaji: "te" },
      { jp: "かんじ", vi: "Chữ Hán", romaji: "kanji" },
    ],
  },
  {
    unit: "Unit 7.3",
    title: "Sinh hoạt thường ngày",
    items: [
      { jp: "うた", vi: "Bài hát", romaji: "uta" },
      { jp: "ギター", vi: "Đàn guitar", romaji: "gitaa" },
      { jp: "だいどころ", vi: "Phòng bếp", romaji: "daidokoro" },
      { jp: "たばこ", vi: "Thuốc lá", romaji: "tabako" },
      { jp: "でんわ", vi: "Điện thoại", romaji: "denwa" },
      { jp: "おさら", vi: "Dĩa", romaji: "osara" },
      { jp: "バイク", vi: "Xe máy", romaji: "baiku" },
      { jp: "ピザ", vi: "Pizza", romaji: "piza" },
      { jp: "まど", vi: "Cửa sổ", romaji: "mado" },
    ],
  },
];

const verbItems = [
  { masu: "いきます", meaning: "Đi đến", group: "1", te: "いって" },
  { masu: "かえります", meaning: "Về", group: "1", te: "かえって" },
  { masu: "たべます", meaning: "Ăn", group: "2", te: "たべて" },
  { masu: "みます", meaning: "Xem", group: "2", te: "みて" },
  { masu: "します", meaning: "Làm", group: "3", te: "して" },
  { masu: "べんきょうします", meaning: "Học", group: "3", te: "べんきょうして" },
  { masu: "きます", meaning: "Đến", group: "3", te: "きて" },
  { masu: "かります", meaning: "Mượn", group: "2", te: "かりて" },
  { masu: "つかいます", meaning: "Sử dụng", group: "1", te: "つかって" },
  { masu: "はなします", meaning: "Nói chuyện", group: "1", te: "はなして" },
];

const adjectiveNotes = [
  {
    type: "Tính từ đuôi い",
    present: "たかいです",
    negative: "たかくないです",
    past: "たかかったです",
    pastNegative: "たかくなかったです",
    usage: "Bỏ い + く khi chuyển phủ định; bỏ い + かった khi chuyển quá khứ.",
  },
  {
    type: "Tính từ đuôi な",
    present: "しずかです",
    negative: "しずかじゃありません",
    past: "しずかでした",
    pastNegative: "しずかじゃありませんでした",
    usage: "Đuôi な dùng khi bổ nghĩa danh từ: ゆうめいな ひと.",
  },
];

const grammarUnits = [
  {
    id: "g4",
    title: "Ngữ pháp 4",
    subtitle: "Phương hướng, tính từ, mô tả nơi chốn",
    color: "border-sky-200 bg-sky-50/70 dark:border-sky-900 dark:bg-sky-900/20",
    points: [
      {
        no: "1",
        topic: "Chỉ phương hướng",
        pattern: "N1（まち）は N2（くに）の ひがし・にし・みなみ・きた・まんなか です",
        explain: "Thành phố là hướng Đông/Tây/Nam/Bắc/Trung của một nước.",
        example: "ハノイは ベトナムの きたです。",
      },
      {
        no: "2",
        topic: "Khoảng thời gian di chuyển",
        pattern:
          "Aから Bまで どのくらいですか。 / Aから Bまで (phương tiện) で ～じかん・～ふん・ぷんです",
        explain: "Hỏi và trả lời từ A đến B mất bao lâu bằng phương tiện gì.",
        example: "日本から ベトナムまで ひこうきで ６じかん くらいです。",
        note: "あるいて không đi với で.",
      },
      {
        no: "3",
        topic: "Tính từ Aな",
        pattern: "Nは Aなです / Nは Aなじゃありません",
        explain: "Khẳng định và phủ định với tính từ đuôi な.",
        example: "わたしの まちは にぎやかな です。",
        note: "ゆうめい, きれい là nhóm な.",
      },
      {
        no: "4",
        topic: "Tính từ Aい",
        pattern: "Nは Aいです / Nは Aいくないです",
        explain: "Khẳng định và phủ định với tính từ đuôi い.",
        example: "ベトナムは あついです。 / ベトナムは あつくないです。",
        note: "いいです → よくないです",
      },
      {
        no: "5",
        topic: "Tính từ bổ nghĩa danh từ",
        pattern: "Aい + N / Aな + N",
        explain: "Dùng tính từ đứng trước danh từ để bổ nghĩa.",
        example: "ふじさんは たかい やまです。 / ホーチミン市は にぎやかな ところです。",
      },
      {
        no: "6",
        topic: "Thời gian + tính từ",
        pattern: "Nは Time、Aです",
        explain: "Giữa thời gian và tính từ không dùng trợ từ に.",
        example: "とうきょうは ６がつ、あめが おおいです。",
      },
      {
        no: "7",
        topic: "Phó từ + tính từ",
        pattern: "とても／すこし + Aです / あまり + phủ định",
        explain: "Dùng phó từ chỉ mức độ với tính từ.",
        example: "この こうえんは あまり おおきくないです。",
      },
      {
        no: "8",
        topic: "Động từ tồn tại あります",
        pattern: "Địa điểm に Nが あります",
        explain: "Có sự vật tại địa điểm.",
        example: "わたしの まちに ゆうめいな おてらが あります。",
      },
      {
        no: "9",
        topic: "Câu hỏi mô tả",
        pattern: "N1は どんな N2ですか / N1は どうですか",
        explain: "Hỏi N như thế nào hoặc hỏi cảm nhận chung.",
        example: "FPTだいがくは どんな だいがく ですか。",
      },
      {
        no: "10",
        topic: "Nối câu có tính từ",
        pattern: "～。そして、～ / ～が、～",
        explain: "そして nối cùng ý; が nối ý trái ngược.",
        example: "このまちは ちいさいですが、ひとが おおいです。",
      },
      {
        no: "11",
        topic: "Kêu gọi đồng tình",
        pattern: "Aね / そうですね",
        explain: "Dùng để xác nhận và đồng tình với người nghe.",
        example: "あついですね。そうですね。",
      },
      {
        no: "12",
        topic: "Hỏi phương tiện di chuyển",
        pattern: "なんで 場所へ Vますか / (phương tiện) で 場所へ Vます",
        explain: "Hỏi đi bằng phương tiện gì.",
        example: "なんで がっこうへ いきますか。→ バスで がっこうへ いきます。",
      },
    ],
  },
  {
    id: "g5",
    title: "Ngữ pháp 5",
    subtitle: "Quá khứ, mong muốn, lý do, mục đích",
    color: "border-violet-200 bg-violet-50/70 dark:border-violet-900 dark:bg-violet-900/20",
    points: [
      {
        no: "1",
        topic: "Chia quá khứ",
        pattern: "Vます→Vました / Vません→Vませんでした; Aな・Aい・N đổi sang でした/じゃありませんでした",
        explain: "Chuyển các mẫu hiện tại sang quá khứ khẳng định/phủ định.",
        example: "たべます→たべました / がくせいです→がくせいでした",
      },
      {
        no: "2",
        topic: "Trợ từ が với thích/ghét",
        pattern: "CNは Nが すきです / きらいです",
        explain: "Tính từ cảm xúc dùng が cho đối tượng.",
        example: "わたしは アニメが すきです。",
      },
      {
        no: "3",
        topic: "Muốn có / muốn làm",
        pattern: "Nが ほしいです / Vます→Vたいです",
        explain: "Diễn tả mong muốn đồ vật hoặc hành động.",
        example: "わたしは くるまが ほしいです。 / すしを たべたいです。",
        note: "Vたい có thể dùng が thay を trong một số trường hợp.",
      },
      {
        no: "4",
        topic: "Phủ định toàn bộ với mong muốn",
        pattern: "なにも ほしくないです / なにも Vたくないです / どこ（へ）も Vたくないです",
        explain: "Không muốn gì / không muốn làm gì / không muốn đi đâu.",
        example: "わたしは なにも ほしくないです。",
      },
      {
        no: "5",
        topic: "Nối hành động sau đó",
        pattern: "V1。それから、V2",
        explain: "Nối hai động từ cùng thì theo trình tự thời gian.",
        example: "えいがをみました。それから、しょくじしました。",
      },
      {
        no: "6",
        topic: "Cùng với ai",
        pattern: "Ngườiと Vます／Vました",
        explain: "Diễn tả làm cùng ai; ひとりで không đi với と.",
        example: "ともだちと サッカーをします。",
      },
      {
        no: "7",
        topic: "Nhân - quả",
        pattern: "Mệnh đề1 から、Mệnh đề2",
        explain: "Dùng から để nói lý do, nguyên nhân.",
        example: "かぜでしたから、どこへも いきませんでした。",
      },
      {
        no: "8",
        topic: "Câu hỏi どうして",
        pattern: "どうして ... か / ... から",
        explain: "Hỏi lý do và trả lời bằng から.",
        example: "どうして けさ、なにも たべませんでしたか。→ いそがしかったですから。",
      },
      {
        no: "9",
        topic: "Yes/No với どこか",
        pattern: "どこか（へ）いきましたか / どこ（へ）も いきませんでした",
        explain: "Hỏi đã đi đâu đó chưa, trả lời có/không.",
        example: "しゅうまつ、どこか へ いきましたか。",
      },
      {
        no: "10",
        topic: "Di chuyển với mục đích",
        pattern: "Địa điểmへ Vます bỏます に いきます（きます／かえります）",
        explain: "Đi đâu để làm gì; có thể dùng danh từ tương ứng.",
        example: "日本へ 日本語を べんきょうしに いきます。",
      },
    ],
  },
  {
    id: "g6",
    title: "Ngữ pháp 6",
    subtitle: "Rủ rê, so sánh, sở hữu, câu hỏi mở",
    color: "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900 dark:bg-emerald-900/20",
    points: [
      {
        no: "1",
        topic: "Rủ rê",
        pattern: "（いっしょに）Vませんか / Vましょう",
        explain: "Mời rủ, đồng ý hoặc từ chối lịch sự.",
        example: "いっしょに ごはんを たべに いきませんか。",
      },
      {
        no: "2",
        topic: "Tổ chức sự kiện",
        pattern: "Địa điểmで Nsự kiệnが あります",
        explain: "Nói có sự kiện tổ chức ở đâu.",
        example: "よこはまで やきゅうのしあいが あります。",
      },
      {
        no: "3",
        topic: "Sở hữu + lượng từ",
        pattern: "Ngườiは Nが Lượng từ あります",
        explain: "Diễn tả có bao nhiêu vật thuộc sở hữu.",
        example: "わたしは えいがの チケットが にまい あります。",
      },
      {
        no: "4",
        topic: "So sánh nhất",
        pattern: "Nchung（のなか）で Ncụ thểが いちばん Aです",
        explain: "Nói cái gì/ai ... nhất trong một nhóm.",
        example: "スポーツで やきゅうが いちばん おもしろいです。",
      },
      {
        no: "5",
        topic: "So sánh hơn",
        pattern: "N1 は N2より Aです",
        explain: "N1 hơn N2 về tính chất A.",
        example: "７がつは ８がつより あめが おおいです。",
      },
      {
        no: "6",
        topic: "Lựa chọn",
        pattern: "N1と N2と どちらが Aですか / N1のほうが Aです / どちらも Aです",
        explain: "Chọn 1 trong 2 hoặc cả 2.",
        example: "なつと ふゆと どちらが すきですか。",
      },
      {
        no: "7",
        topic: "Yes/No với もう",
        pattern: "もう Vましたか / はい、もうVました / いいえ、まだです",
        explain: "Hỏi hành động đã xảy ra hay chưa.",
        example: "もう ふじまるランドへ いきましたか。",
      },
      {
        no: "8",
        topic: "Câu hỏi gợi mở",
        pattern: "Nは どうですか / Nですね",
        explain: "Đề xuất và xác nhận ý kiến.",
        example: "９じは どうですか。→ ９じですね。",
      },
      {
        no: "9",
        topic: "Từ đệm よ",
        pattern: "... よ",
        explain: "Nhấn mạnh thông tin, đưa thông tin mới cho người nghe.",
        example: "やまださんは だいがくの せんせいですよ。",
      },
    ],
  },
  {
    id: "g7",
    title: "Ngữ pháp 7",
    subtitle: "Vị trí, thể て, mệnh lệnh, công cụ",
    color: "border-amber-200 bg-amber-50/70 dark:border-amber-900 dark:bg-amber-900/20",
    points: [
      {
        no: "1",
        topic: "N là tân ngữ (tồn tại)",
        pattern: "N1の位置 に Nđồ vậtが あります / Nngười・động vậtが います",
        explain: "Mô tả có đồ vật hoặc người ở vị trí nào đó.",
        example: "ぎんこうの まえに ほんやが あります。",
      },
      {
        no: "2",
        topic: "N là chủ ngữ (tồn tại)",
        pattern: "Nđồ vậtは N1の位置に あります / Nngườiは N1の位置に います",
        explain: "Đổi trọng tâm câu sang chủ ngữ.",
        example: "バスていは コンビニのまえに あります。",
      },
      {
        no: "3",
        topic: "Tóm tắt thể て",
        pattern: "Nhóm1: i-row trước ます; Nhóm2: bỏます+て; Nhóm3: きます/します",
        explain: "Nhóm 1 có 5 trường hợp + ngoại lệ いきます→いって.",
        example: "みます→みて / かります→かりて / します→して",
      },
      {
        no: "4",
        topic: "Mệnh lệnh lịch sự",
        pattern: "Vて ください",
        explain: "Xin hãy làm ...",
        example: "わたしの かばんを とって ください。",
      },
      {
        no: "5",
        topic: "Hiện tại tiếp diễn",
        pattern: "Vて います",
        explain: "Diễn tả hành động đang diễn ra.",
        example: "パクさんは あそこで でんわを かけて います。",
      },
      {
        no: "6",
        topic: "Đề nghị giúp",
        pattern: "Vます ましょうか",
        explain: "Để tôi làm giúp bạn.",
        example: "しゃしんを とりましょうか。",
      },
      {
        no: "7",
        topic: "Cách làm ~",
        pattern: "（Nの）Vます + かた",
        explain: "Hỏi hoặc nói cách làm, cách viết.",
        example: "りょうりの つくりかたを おしえてください。",
      },
      {
        no: "8",
        topic: "Yes/No với まだ",
        pattern: "まだ Vますか / はい、まだVます / いいえ、もうVません",
        explain: "Hỏi còn tiếp tục hay không.",
        example: "サラダは まだ ありますか。",
      },
      {
        no: "9",
        topic: "Cái nào (3 cái trở lên)",
        pattern: "どのNですか / どれですか",
        explain: "Hỏi chọn đồ vật cụ thể trong nhiều lựa chọn.",
        example: "どの おさらですか。→ その おさらです。",
      },
      {
        no: "10",
        topic: "Bằng công cụ/phương tiện",
        pattern: "なんで Vますか / Công cụ・phương tiệnで Vます",
        explain: "Diễn tả làm bằng gì, đi bằng gì.",
        example: "日本人は はしで ごはんを たべます。",
      },
      {
        no: "11",
        topic: "Nhấn mạnh ai",
        pattern: "だれが Vますか／Vましたか",
        explain: "Nhấn mạnh chủ thể thực hiện hành động.",
        example: "だれが このケーキを つくりましたか。→ ワンさんが つくりました。",
      },
    ],
  },
];

const grammarPointCount = grammarUnits.reduce((total, unit) => total + unit.points.length, 0);

const cardMotion = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function toPastForm(masuForm: string) {
  if (masuForm.endsWith("ます")) {
    return masuForm.replace(/ます$/, "ました");
  }
  return `${masuForm} (quá khứ: ました)`;
}

const groupLabel: Record<string, string> = {
  "1": "Nhóm 1",
  "2": "Nhóm 2",
  "3": "Nhóm 3",
};

const groupColor: Record<string, string> = {
  "1": "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
  "2": "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200",
  "3": "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
};

const teGuide = {
  group1: {
    title: "I. Động từ nhóm 1",
    intro:
      "Là những động từ có kết thúc thuộc cột 「い」trước 「ます」. Thể 「て」 của nhóm 1 khá phức tạp, tùy âm tiết trước 「ます」.",
    rules: [
      {
        condition: "Kết thúc 「い、ち、り」trước 「ます」",
        transform: "Bỏ 「ます」, thay 「い、ち、り」 bằng 「って」",
        examples: ["かいます（mua）→ かって", "まちます（đợi）→ まって", "つくります（tạo ra, làm ra）→ つくって"],
        note: "Lưu ý động từ đặc biệt: いきます（đi）→ いって",
      },
      {
        condition: "Kết thúc 「み、び、に」trước 「ます」",
        transform: "Bỏ 「ます」, thay 「み、び、に」 bằng 「んで」",
        examples: ["しにます（chết）→ しんで", "あそびます（chơi）→ あそんで", "よみます（đọc）→ よんで"],
      },
      {
        condition: "Kết thúc 「き」trước 「ます」",
        transform: "Bỏ 「ます」, thay 「き」 bằng 「いて」",
        examples: ["ききます（nghe, hỏi）→ きいて", "かきます（viết）→ かいて"],
      },
      {
        condition: "Kết thúc 「ぎ」trước 「ます」",
        transform: "Bỏ 「ます」, thay 「ぎ」 bằng 「いで」",
        examples: ["およぎます（bơi）→ およいで"],
      },
      {
        condition: "Kết thúc 「し」trước 「ます」",
        transform: "Bỏ 「ます」, thêm 「て」thành 「して」",
        examples: ["はなします（nói）→ はなして", "だします（đưa ra）→ だして"],
      },
    ],
  },
  group2: {
    title: "II. Động từ nhóm 2",
    intro: "Là những động từ có kết thúc thuộc cột 「え」trước 「ます」.",
    rules: [
      {
        condition: "Quy tắc chính",
        transform: "Bỏ 「ます」 + thêm 「て」",
        examples: ["たべます（ăn）→ たべて", "きえます（biến mất）→ きえて", "おきます（thức dậy）→ おきて"],
      },
      {
        condition: "Lưu ý đặc biệt",
        transform:
          "Một số từ có cột 「い」trước 「ます」 nhưng vẫn là nhóm 2: おきます、みます、おります、あびます、おちます、います、できます、しんじます、かります、きます（mặc）、たります",
        examples: [],
      },
    ],
  },
  group3: {
    title: "III. Động từ nhóm 3",
    intro: "Là động từ 来ます、（N）します.",
    rules: [
      {
        condition: "Quy tắc",
        transform: "Bỏ 「ます」 + thêm 「て」",
        examples: ["きます（đến）→ きて", "します（làm）→ して", "べんきょうします（học）→ べんきょうして"],
      },
    ],
  },
};

const teVerbGroups = {
  group1: [
    { masu: "いきます", meaning: "Đi", te: "いって" },
    { masu: "かえります", meaning: "Về", te: "かえって" },
    { masu: "のみます", meaning: "Uống", te: "のんで" },
    { masu: "はたらきます", meaning: "Làm việc", te: "はたらいて" },
    { masu: "かいます", meaning: "Mua", te: "かって" },
    { masu: "ききます", meaning: "Nghe, hỏi", te: "きいて" },
    { masu: "よみます", meaning: "Đọc", te: "よんで" },
    { masu: "あいます", meaning: "Gặp", te: "あって" },
    { masu: "つくります", meaning: "Nấu", te: "つくって" },
    { masu: "のぼります", meaning: "Leo lên", te: "のぼって" },
    { masu: "はいります", meaning: "Vào", te: "はいって" },
    { masu: "とります", meaning: "Lấy, chụp", te: "とって" },
    { masu: "あります", meaning: "Có", te: "あって" },
    { masu: "あそびます", meaning: "Chơi", te: "あそんで" },
    { masu: "わかります", meaning: "Hiểu", te: "わかって" },
    { masu: "あらいます", meaning: "Rửa", te: "あらって" },
    { masu: "かきます", meaning: "Viết", te: "かいて" },
    { masu: "かします", meaning: "Cho mượn", te: "かして" },
    { masu: "きります", meaning: "Cắt", te: "きって" },
    { masu: "つかいます", meaning: "Sử dụng", te: "つかって" },
    { masu: "てつだいます", meaning: "Giúp đỡ", te: "てつだって" },
    { masu: "もっていきます", meaning: "Mang đi", te: "もっていって" },
    { masu: "だします", meaning: "Lấy ra", te: "だして" },
    { masu: "うたいます", meaning: "Hát", te: "うたって" },
    { masu: "すいます", meaning: "Hút thuốc", te: "すって" },
    { masu: "はなします", meaning: "Nói chuyện", te: "はなして" },
    { masu: "ひきます", meaning: "Kéo", te: "ひいて" },
    { masu: "もちます", meaning: "Cầm", te: "もって" },
  ],
  group2: [
    { masu: "たべます", meaning: "Ăn", te: "たべて" },
    { masu: "ねます", meaning: "Ngủ", te: "ねて" },
    { masu: "むかえます", meaning: "Đón", te: "むかえて" },
    { masu: "いれます", meaning: "Bỏ vào", te: "いれて" },
    { masu: "おしえます", meaning: "Dạy", te: "おしえて" },
    { masu: "あけます", meaning: "Mở", te: "あけて" },
    { masu: "しめます", meaning: "Đóng", te: "しめて" },
    { masu: "かけます", meaning: "Gọi", te: "かけて" },
    { masu: "みます", meaning: "Xem", te: "みて", mark: "*" },
    { masu: "おきます", meaning: "Thức dậy", te: "おきて", mark: "*" },
    { masu: "かります", meaning: "Mượn", te: "かりて", mark: "*" },
    { masu: "います", meaning: "Có (người)", te: "いて", mark: "*" },
  ],
  group3: [
    { masu: "きます", meaning: "Đến", te: "きて" },
    { masu: "N をします", meaning: "Chơi, làm...", te: "N をして", example: "サッカーをします" },
    { masu: "N します", meaning: "Học / làm N", te: "N して", example: "べんきょうします" },
    { masu: "かいものします", meaning: "Mua sắm", te: "かいものして" },
    { masu: "しょくじします", meaning: "Dùng bữa", te: "しょくじして" },
    { masu: "せんたくします", meaning: "Giặt giũ", te: "せんたくして" },
    { masu: "そうじします", meaning: "Dọn dẹp", te: "そうじして" },
    { masu: "もってきます", meaning: "Mang đến", te: "もってきて" },
  ],
};

const highlightNotes = [
  {
    title: "Tương lai = hiện tại",
    content: "Trong tiếng Nhật cơ bản, dạng lịch sự hiện tại (〜ます / 〜です) cũng dùng cho ý nghĩa tương lai, cần thêm trạng từ thời gian như あした, らいしゅう.",
    style: "border-sky-300 bg-sky-50/80 dark:border-sky-800 dark:bg-sky-900/20",
  },
  {
    title: "Tính từ い đặc biệt",
    content: "いい là tính từ đặc biệt: いい → よくない → よかった → よくなかった.",
    style: "border-amber-300 bg-amber-50/80 dark:border-amber-800 dark:bg-amber-900/20",
  },
  {
    title: "Đuôi い nhưng là tính từ な",
    content: "Các từ như きれい・ゆうめい・きらい tuy kết thúc bằng い nhưng chia theo nhóm tính từ な.",
    style: "border-emerald-300 bg-emerald-50/80 dark:border-emerald-800 dark:bg-emerald-900/20",
  },
  {
    title: "Thể て phải nhớ theo nhóm",
    content: "Ôn theo nhóm 1/2/3 giúp nhớ nhanh quy tắc và dùng tốt trong mẫu nối câu, đề nghị, yêu cầu.",
    style: "border-fuchsia-300 bg-fuchsia-50/80 dark:border-fuchsia-800 dark:bg-fuchsia-900/20",
  },
];

const kanjiLessons = [
  {
    unit: "UNIT 4",
    items: [
      { hanViet: "ĐÔNG", kanji: "東", hira: "ひがし", meaning: "Phía đông" },
      { hanViet: "ĐÔNG KINH", kanji: "東京", hira: "とうきょう", meaning: "Tokyo" },
      { hanViet: "DANH TIỀN", kanji: "名前", hira: "なまえ", meaning: "Tên" },
      { hanViet: "TIỀN", kanji: "前", hira: "まえ", meaning: "Phía trước" },
      { hanViet: "NGỌ TIỀN", kanji: "午前", hira: "ごぜん", meaning: "AM (Sáng)" },
      { hanViet: "TIỀN NHẬT", kanji: "前日", hira: "ぜんじつ", meaning: "Trước ngày" },
      { hanViet: "QUỐC", kanji: "国", hira: "くに", meaning: "Đất nước" },
      { hanViet: "TRUNG QUỐC", kanji: "中国", hira: "ちゅうごく", meaning: "Trung Quốc" },
      { hanViet: "NGOẠI QUỐC", kanji: "外国", hira: "がいこく", meaning: "Ngoại quốc" },
      { hanViet: "NAM NHÂN", kanji: "男の人", hira: "おとこのひと", meaning: "Người đàn ông" },
      { hanViet: "NỮ NHÂN", kanji: "女の人", hira: "おんなのひと", meaning: "Người phụ nữ" },
      { hanViet: "NAM NỮ", kanji: "男女", hira: "だんじょ", meaning: "Nam nữ" },
      { hanViet: "KHU", kanji: "９区", hira: "９く（きゅうく）", meaning: "Quận 9" },
      { hanViet: "THỊ", kanji: "ホーチミン市", hira: "ホーチミンし", meaning: "TP. HCM" },
    ],
  },
  {
    unit: "UNIT 5",
    items: [
      { hanViet: "TIÊN SINH", kanji: "先生", hira: "せんせい", meaning: "Giáo viên" },
      { hanViet: "TIÊN NHẬT", kanji: "先日", hira: "せんじつ", meaning: "Ngày trước" },
      { hanViet: "TIÊN NGUYỆT", kanji: "先月", hira: "せんげつ", meaning: "Tháng trước" },
      { hanViet: "TIÊN CHU", kanji: "先週", hira: "せんしゅう", meaning: "Tuần trước" },
      { hanViet: "NHẤT CHU GIAN", kanji: "一週間", hira: "いっしゅうかん", meaning: "1 tuần" },
      { hanViet: "MỖI NHẬT", kanji: "毎日", hira: "まいにち", meaning: "Mỗi ngày" },
      { hanViet: "MỖI NGUYỆT", kanji: "毎月", hira: "まいつき", meaning: "Mỗi tháng" },
      { hanViet: "MỖI CHU", kanji: "毎週", hira: "まいしゅう", meaning: "Mỗi tuần" },
      { hanViet: "MỖI NIÊN", kanji: "毎年", hira: "まいとし", meaning: "Mỗi năm" },
      { hanViet: "NGỌ TIỀN", kanji: "午前", hira: "ごぜん", meaning: "AM (Buổi sáng)" },
      { hanViet: "NGỌ HẬU", kanji: "午後", hira: "ごご", meaning: "PM (Buổi chiều)" },
      { hanViet: "HẬU", kanji: "後ろ", hira: "うしろ", meaning: "Phía sau" },
      { hanViet: "TIỀN HẬU", kanji: "前後", hira: "ぜんご", meaning: "Trước sau" },
      { hanViet: "KIẾN", kanji: "見ます", hira: "みます", meaning: "Xem" },
      { hanViet: "KIẾN HỌC", kanji: "見学", hira: "けんがく", meaning: "Tham quan và học tập" },
      { hanViet: "THỰC", kanji: "食べます", hira: "たべます", meaning: "Ăn" },
      { hanViet: "THỰC SỰ", kanji: "食事", hira: "しょくじ", meaning: "Việc dùng bữa" },
      { hanViet: "ẨM", kanji: "飲みます", hira: "のみます", meaning: "Uống" },
      { hanViet: "ẨM THUỶ", kanji: "飲み水", hira: "のみみず", meaning: "Nước uống" },
      { hanViet: "ẨM THỰC", kanji: "飲食", hira: "いんしょく", meaning: "Ẩm thực" },
      { hanViet: "MÃI", kanji: "買います", hira: "かいます", meaning: "Mua" },
      { hanViet: "THỰC VẬT", kanji: "食べ物", hira: "たべもの", meaning: "Đồ ăn" },
      { hanViet: "ẨM VẬT", kanji: "飲み物", hira: "のみもの", meaning: "Đồ uống" },
      { hanViet: "MÃI VẬT", kanji: "買い物", hira: "かいもの", meaning: "Đồ mua" },
      { hanViet: "KIẾN VẬT", kanji: "見物", hira: "けんぶつ", meaning: "Thăm quan" },
      { hanViet: "NHÂN VẬT", kanji: "人物", hira: "じんぶつ", meaning: "Nhân vật" },
      { hanViet: "HÀNH", kanji: "行きます", hira: "いきます", meaning: "Đi" },
      { hanViet: "HƯU", kanji: "休み（N）", hira: "やすみ", meaning: "Nghỉ" },
      { hanViet: "HƯU", kanji: "休みます（V）", hira: "やすみます", meaning: "Nghỉ" },
      { hanViet: "HƯU NHẬT", kanji: "休みの日", hira: "やすみのひ", meaning: "Ngày nghỉ" },
      { hanViet: "HƯU NHẬT", kanji: "休日", hira: "きゅうじつ", meaning: "Ngày nghỉ" },
    ],
  },
  {
    unit: "UNIT 6",
    items: [
      { hanViet: "KIM", kanji: "今", hira: "いま", meaning: "Bây giờ" },
      { hanViet: "KIM NHẬT", kanji: "今日", hira: "きょう", meaning: "Hôm nay" },
      { hanViet: "KIM CHU", kanji: "今週", hira: "こんしゅう", meaning: "Tuần này" },
      { hanViet: "KIM NGUYỆT", kanji: "今月", hira: "こんげつ", meaning: "Tháng này" },
      { hanViet: "KIM NIÊN", kanji: "今年", hira: "ことし", meaning: "Năm nay" },
      { hanViet: "LAI", kanji: "来ます", hira: "きます", meaning: "Đến" },
      { hanViet: "LAI NHẬT", kanji: "来日", hira: "らいにち", meaning: "Đến Nhật" },
      { hanViet: "LAI CHU", kanji: "来週", hira: "らいしゅう", meaning: "Tuần sau" },
      { hanViet: "LAI NGUYỆT", kanji: "来月", hira: "らいげつ", meaning: "Tháng sau" },
      { hanViet: "LAI NIÊN", kanji: "来年", hira: "らいねん", meaning: "Năm sau" },
      { hanViet: "QUY", kanji: "帰ります", hira: "かえります", meaning: "Về" },
      { hanViet: "QUY QUỐC", kanji: "帰国", hira: "きこく", meaning: "Về nước" },
      { hanViet: "NHẬT QUY", kanji: "日帰り", hira: "ひがえり", meaning: "Về trong ngày" },
      { hanViet: "HỘI", kanji: "会います", hira: "あいます", meaning: "Gặp" },
      { hanViet: "ẨM HỘI", kanji: "飲み会", hira: "のみかい", meaning: "Tiệc nhậu" },
      { hanViet: "QUỐC HỘI", kanji: "国会", hira: "こっかい", meaning: "Quốc hội" },
      { hanViet: "KIẾN HỘI", kanji: "会見", hira: "かいけん", meaning: "Phỏng vấn" },
      { hanViet: "HỘI XÃ", kanji: "会社", hira: "かいしゃ", meaning: "Công ty" },
      { hanViet: "XÃ HỘI", kanji: "社会", hira: "しゃかい", meaning: "Xã hội" },
      { hanViet: "VĂN", kanji: "聞きます", hira: "ききます", meaning: "Nghe" },
      { hanViet: "TÂN VĂN", kanji: "新聞", hira: "しんぶん", meaning: "Tờ báo" },
      { hanViet: "ĐỘC", kanji: "読みます", hira: "よみます", meaning: "Đọc" },
      { hanViet: "ĐỘC VẬT", kanji: "読み物", hira: "よみもの", meaning: "Tài liệu đọc" },
      { hanViet: "THƯ", kanji: "書きます", hira: "かきます", meaning: "Viết" },
      { hanViet: "THƯ VẬT", kanji: "書き物", hira: "かきもの", meaning: "Tài liệu viết" },
      { hanViet: "TỪ THƯ", kanji: "辞書", hira: "じしょ", meaning: "Từ điển" },
      { hanViet: "ĐỘC THƯ", kanji: "読書", hira: "どくしょ", meaning: "Việc đọc sách" },
      { hanViet: "THOẠI", kanji: "話", hira: "はなし", meaning: "Câu chuyện" },
      { hanViet: "THOẠI", kanji: "話します", hira: "はなします", meaning: "Nói chuyện" },
      { hanViet: "ĐIỆN THOẠI", kanji: "電話", hira: "でんわ", meaning: "Gọi điện thoại" },
      { hanViet: "HỘI THOẠI", kanji: "会話", hira: "かいわ", meaning: "Hội thoại" },
      { hanViet: "TỰ", kanji: "お寺", hira: "おてら", meaning: "Chùa" },
      { hanViet: "NGÔN", kanji: "言います", hira: "いいます", meaning: "Nói" },
      { hanViet: "NGÔN THOẠI", kanji: "言語", hira: "げんご", meaning: "Ngôn ngữ" },
      { hanViet: "NGÔN DIỆP", kanji: "言葉", hira: "ことば", meaning: "Từ vựng" },
      { hanViet: "BỐI", kanji: "貝", hira: "かい", meaning: "Con sò" },
      { hanViet: "ĐIỀN TRUNG", kanji: "田中さん", hira: "たなかさん", meaning: "Họ người Nhật" },
      { hanViet: "THUỶ ĐIỀN", kanji: "水田", hira: "すいでん", meaning: "Ruộng lúa nước" },
      { hanViet: "ĐIỀN", kanji: "田んぼ", hira: "たんぼ", meaning: "Cánh đồng ruộng" },
      { hanViet: "LỰC", kanji: "力", hira: "ちから", meaning: "Sức mạnh" },
      { hanViet: "HOẢ LỰC", kanji: "火力", hira: "かりょく", meaning: "Hoả lực" },
      { hanViet: "THUỶ LỰC", kanji: "水力", hira: "すいりょく", meaning: "Thuỷ lực" },
      { hanViet: "ĐẠI HỌC MÔN", kanji: "大学の門", hira: "だいがくのもん", meaning: "Cổng trường đại học" },
      { hanViet: "HỌC HIỆU MÔN", kanji: "学校の門", hira: "がっこうのもん", meaning: "Cổng trường" },
    ],
  },
  {
    unit: "UNIT 7",
    items: [
      { hanViet: "NHỤC", kanji: "肉", hira: "にく", meaning: "Thịt" },
      { hanViet: "NGƯU NHỤC", kanji: "牛肉", hira: "ぎゅうにく", meaning: "Thịt bò" },
      { hanViet: "ĐIỂU NHỤC", kanji: "鶏肉", hira: "とりにく", meaning: "Thịt gà" },
      { hanViet: "THỈ NHỤC", kanji: "豚肉", hira: "ぶたにく", meaning: "Thịt heo" },
      { hanViet: "LIỆU KIM", kanji: "料金", hira: "りょうきん", meaning: "Chi phí" },
      { hanViet: "LIỆU LÝ", kanji: "料理", hira: "りょうり", meaning: "Nấu ăn" },
      { hanViet: "DÃ THÁI", kanji: "野菜", hira: "やさい", meaning: "Rau củ" },
      { hanViet: "NHẤT THỜI BÀN", kanji: "一時半", hira: "いちじはん", meaning: "Một giờ rưỡi" },
      { hanViet: "BÁN PHÂN", kanji: "半分", hira: "はんぶん", meaning: "Phân nửa" },
      { hanViet: "BÁN NHẬT", kanji: "半日", hira: "はんじつ・はんにち", meaning: "Nửa ngày" },
      { hanViet: "BÁN NGUYỆT", kanji: "半月", hira: "はんつき", meaning: "Nửa tháng" },
      { hanViet: "BÁN NIÊN", kanji: "半年", hira: "はんとし", meaning: "Nửa năm" },
      { hanViet: "BÁN", kanji: "半ば", hira: "なかば", meaning: "Một nửa" },
      { hanViet: "ĐẠI", kanji: "大きい", hira: "おおきい", meaning: "To, lớn" },
      { hanViet: "ĐẠI NHÂN", kanji: "大人", hira: "おとな", meaning: "Người lớn" },
      { hanViet: "ĐẠI HỌC", kanji: "大学", hira: "だいがく", meaning: "Đại học" },
      { hanViet: "ĐẠI HỌC SINH", kanji: "大学生", hira: "だいがくせい", meaning: "Sinh viên đại học" },
      { hanViet: "ĐẠI HỘI", kanji: "大会", hira: "たいかい", meaning: "Đại hội" },
      { hanViet: "ĐẠI BÁN", kanji: "大半", hira: "たいはん", meaning: "Quá một nửa" },
      { hanViet: "TIỂU", kanji: "小さい", hira: "ちいさい", meaning: "Nhỏ" },
      { hanViet: "TIỂU NHÂN", kanji: "小人", hira: "こびと", meaning: "Người lùn" },
      { hanViet: "TIỂU HỌC HIỆU", kanji: "小学校", hira: "しょうがっこう", meaning: "Trường tiểu học" },
      { hanViet: "TIỂU HỌC SINH", kanji: "小学生", hira: "しょうがくせい", meaning: "Học sinh tiểu học" },
    ],
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nounCount = nounLessons.reduce((total, lesson) => total + lesson.items.length, 0);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
      );
    }

    gsap.fromTo(
      ".reveal-item",
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", delay: 0.15 }
    );
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-900/20" />
      <div className="pointer-events-none absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-900/20" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-900/20" />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <section
          ref={heroRef}
          className="reveal-item rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/40 p-6 shadow-sm md:p-10"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge>JPD113 + JPD123</Badge>
            <Badge variant="secondary">Tổng hợp từ 3 tài liệu</Badge>
            <Badge variant="outline">Kanji Unit 4-7</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">Tổng hợp kiến thức tiếng Nhật</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Trang này tổng hợp từ vựng, chia động từ, chia tính từ và ngữ pháp trọng điểm từ các file:
            TỔNG HỢP ĐỘNG TỪ JPD113 VÀ 123, Ôn tập tiếng nhật, 漢字まとめ4-7.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => document.getElementById("tu-vung")?.scrollIntoView({ behavior: "smooth" })}>
              Bắt đầu ôn từ vựng
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById("ngu-phap")?.scrollIntoView({ behavior: "smooth" })}
            >
              Xem nhanh ngữ pháp
            </Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-sky-200/70 bg-sky-50/70 p-3 text-sm dark:border-sky-900 dark:bg-sky-900/20">
              <p className="font-semibold">1. Nhìn màu để nhớ nhóm</p>
              <p className="text-muted-foreground">Nhóm 1 (xanh), Nhóm 2 (tím), Nhóm 3 (hồng)</p>
            </div>
            <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/70 p-3 text-sm dark:border-emerald-900 dark:bg-emerald-900/20">
              <p className="font-semibold">2. Học theo card ngắn</p>
              <p className="text-muted-foreground">Mỗi card = 1 ý, giảm quá tải khi đọc dài</p>
            </div>
            <div className="rounded-xl border border-fuchsia-200/70 bg-fuchsia-50/70 p-3 text-sm dark:border-fuchsia-900 dark:bg-fuchsia-900/20">
              <p className="font-semibold">3. Luyện theo unit</p>
              <p className="text-muted-foreground">Bám đúng chương để ôn và kiểm tra nhanh</p>
            </div>
          </div>
        </section>

        <section className="reveal-item mt-8 grid gap-4 md:grid-cols-3">
          {[
            { label: "Mục từ vựng", value: nounCount + verbItems.length, icon: Languages },
            { label: "Mẫu ngữ pháp", value: grammarPointCount, icon: BookOpen },
            { label: "Điểm lưu ý", value: 8, icon: Sparkles },
          ].map((item) => (
            <motion.div key={item.label} variants={cardMotion} initial="hidden" animate="visible" whileHover={{ y: -4 }}>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </CardDescription>
                  <CardTitle className="text-3xl">{item.value}</CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </section>

        <section id="tu-vung" className="reveal-item mt-12">
          <h2 className="text-2xl font-semibold md:text-3xl">Từ vựng & chia từ loại</h2>
          <p className="mt-2 text-muted-foreground">
            Phân loại theo danh từ, động từ, tính từ; đồng thời hiển thị hiện tại/quá khứ, nhóm động từ và tính từ đuôi い/な.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Badge className="bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200">Học theo nhóm</Badge>
            <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-200">Lặp lại bằng màu</Badge>
            <Badge className="bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200">Ưu tiên ví dụ ngắn</Badge>
            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">Ôn theo Unit</Badge>
          </div>

          <Tabs defaultValue="verbs" className="mt-5">
            <TabsList className="sticky top-3 z-20 w-full justify-start gap-1 overflow-x-auto rounded-2xl bg-card/90 backdrop-blur">
              <TabsTrigger value="verbs">Động từ</TabsTrigger>
              <TabsTrigger value="nouns">Danh từ</TabsTrigger>
              <TabsTrigger value="adjectives">Tính từ</TabsTrigger>
              <TabsTrigger value="kanji">Kanji</TabsTrigger>
            </TabsList>

            <TabsContent value="verbs">
              <Card className="border-sky-200 bg-gradient-to-br from-sky-50/80 via-background to-violet-50/70 dark:border-sky-900">
                <CardHeader>
                  <CardTitle>Bảng 1: Cách chia thể て theo 3 nhóm</CardTitle>
                  <CardDescription>Nội dung thay theo đúng phần I / II / III bạn cung cấp, giữ format trực quan để dễ học.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-sky-200 bg-sky-50/80 p-4 dark:border-sky-900 dark:bg-sky-900/20">
                    <span className={`mb-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${groupColor["1"]}`}>
                      {groupLabel["1"]}
                    </span>
                    <p className="mb-2 text-sm font-semibold">{teGuide.group1.title}</p>
                    <p className="mb-3 text-xs text-muted-foreground">{teGuide.group1.intro}</p>
                    <div className="space-y-3 text-sm">
                      {teGuide.group1.rules.map((rule) => (
                        <div key={rule.condition} className="rounded-lg border border-sky-200/70 bg-background/80 p-2 dark:border-sky-800">
                          <p className="font-medium">{rule.condition}</p>
                          <p className="text-xs text-muted-foreground">{rule.transform}</p>
                          {rule.examples.length > 0 ? (
                            <ul className="mt-1 space-y-1 text-xs">
                              {rule.examples.map((example) => (
                                <li key={example}>• {example}</li>
                              ))}
                            </ul>
                          ) : null}
                          {rule.note ? <p className="mt-1 text-xs font-semibold text-amber-700 dark:text-amber-300">{rule.note}</p> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-violet-200 bg-violet-50/80 p-4 dark:border-violet-900 dark:bg-violet-900/20">
                    <span className={`mb-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${groupColor["2"]}`}>
                      {groupLabel["2"]}
                    </span>
                    <p className="mb-2 text-sm font-semibold">{teGuide.group2.title}</p>
                    <p className="mb-3 text-xs text-muted-foreground">{teGuide.group2.intro}</p>
                    <div className="space-y-3 text-sm">
                      {teGuide.group2.rules.map((rule) => (
                        <div key={rule.condition} className="rounded-lg border border-violet-200/70 bg-background/80 p-2 dark:border-violet-800">
                          <p className="font-medium">{rule.condition}</p>
                          <p className="text-xs text-muted-foreground">{rule.transform}</p>
                          {rule.examples.length > 0 ? (
                            <ul className="mt-1 space-y-1 text-xs">
                              {rule.examples.map((example) => (
                                <li key={example}>• {example}</li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-4 dark:border-rose-900 dark:bg-rose-900/20">
                    <span className={`mb-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${groupColor["3"]}`}>
                      {groupLabel["3"]}
                    </span>
                    <p className="mb-2 text-sm font-semibold">{teGuide.group3.title}</p>
                    <p className="mb-3 text-xs text-muted-foreground">{teGuide.group3.intro}</p>
                    <div className="space-y-3 text-sm">
                      {teGuide.group3.rules.map((rule) => (
                        <div key={rule.condition} className="rounded-lg border border-rose-200/70 bg-background/80 p-2 dark:border-rose-800">
                          <p className="font-medium">{rule.condition}</p>
                          <p className="text-xs text-muted-foreground">{rule.transform}</p>
                          {rule.examples.length > 0 ? (
                            <ul className="mt-1 space-y-1 text-xs">
                              {rule.examples.map((example) => (
                                <li key={example}>• {example}</li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4 border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-background to-cyan-50/70 dark:border-emerald-900">
                <CardHeader>
                  <CardTitle>Bảng 1.1: Danh sách động từ thể て theo Nhóm 1/2/3</CardTitle>
                  <CardDescription>
                    Bổ sung đầy đủ danh sách bạn gửi, gồm động từ gốc, nghĩa và dạng thể て. Dấu * là các từ hay nhầm nhóm.
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left bg-muted/60">
                        <th className="px-3 py-2">Nhóm 1</th>
                        <th className="px-3 py-2">Nhóm 2</th>
                        <th className="px-3 py-2">Nhóm 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({
                        length: Math.max(teVerbGroups.group1.length, teVerbGroups.group2.length, teVerbGroups.group3.length),
                      }).map((_, index) => {
                        const g1 = teVerbGroups.group1[index];
                        const g2 = teVerbGroups.group2[index];
                        const g3 = teVerbGroups.group3[index];

                        return (
                          <tr key={`te-row-${index}`} className="border-b border-border/50 align-top">
                            <td className="px-3 py-2">
                              {g1 ? (
                                <div className="space-y-0.5">
                                  <p className="font-medium">{g1.masu}</p>
                                  <p className="text-xs text-muted-foreground">{g1.meaning}</p>
                                  <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">→ {g1.te}</p>
                                </div>
                              ) : null}
                            </td>
                            <td className="px-3 py-2">
                              {g2 ? (
                                <div className="space-y-0.5">
                                  <p className="font-medium">
                                    {g2.mark ?? ""}
                                    {g2.masu}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{g2.meaning}</p>
                                  <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">→ {g2.te}</p>
                                </div>
                              ) : null}
                            </td>
                            <td className="px-3 py-2">
                              {g3 ? (
                                <div className="space-y-0.5">
                                  <p className="font-medium">{g3.masu}</p>
                                  <p className="text-xs text-muted-foreground">{g3.meaning}</p>
                                  {g3.example ? <p className="text-xs text-muted-foreground">VD: {g3.example}</p> : null}
                                  <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">→ {g3.te}</p>
                                </div>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              <Card className="mt-4 border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-background to-cyan-50/70 dark:border-emerald-900">
                <CardHeader>
                  <CardTitle>Bảng 2: Bình thường / Quá khứ / Tương lai (Động từ)</CardTitle>
                  <CardDescription>
                    Lưu ý: trong tiếng Nhật cơ bản, dạng bình thường lịch sự (〜ます) cũng có thể mang nghĩa tương lai tùy ngữ cảnh.
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left bg-muted/60">
                        <th className="px-2 py-2">Động từ</th>
                        <th className="px-2 py-2">Bình thường</th>
                        <th className="px-2 py-2">Quá khứ</th>
                        <th className="px-2 py-2">Tương lai</th>
                      </tr>
                    </thead>
                    <tbody>
                      {verbItems.map((item) => (
                        <tr key={`${item.masu}-tense`} className="border-b border-border/60">
                          <td className="px-2 py-2 font-medium">{item.masu}</td>
                          <td className="px-2 py-2">{item.masu}</td>
                          <td className="px-2 py-2">{toPastForm(item.masu)}</td>
                          <td className="px-2 py-2">あした {item.masu}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nouns">
              <Card className="border-fuchsia-200 bg-gradient-to-br from-fuchsia-50/70 via-background to-cyan-50/60 dark:border-fuchsia-900">
                <CardHeader>
                  <CardTitle>Danh từ theo từng bài (Unit 4.1 → 7.3)</CardTitle>
                  <CardDescription>
                    Bấm từng Unit để xem danh từ chi tiết: từ tiếng Nhật, nghĩa tiếng Việt và romaji.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion defaultValue="noun-unit-0">
                    {nounLessons.map((lesson, index) => (
                      <AccordionItem key={lesson.unit} value={`noun-unit-${index}`}>
                        <AccordionTrigger value={`noun-unit-${index}`}>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge>{lesson.unit}</Badge>
                            <span className="font-medium">{lesson.title}</span>
                            <Badge variant="secondary">{lesson.items.length} từ</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent value={`noun-unit-${index}`}>
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {lesson.items.map((item) => (
                              <motion.div key={`${lesson.unit}-${item.jp}`} whileHover={{ y: -3 }}>
                                <Card className="h-full border-border/80 bg-card/80">
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-xl leading-none">{item.jp}</CardTitle>
                                    <CardDescription>{item.romaji}</CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <Badge variant="secondary">{item.vi}</Badge>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="adjectives">
              <div className="grid gap-4 lg:grid-cols-2">
                {adjectiveNotes.map((item) => (
                  <motion.div key={item.type} whileHover={{ y: -4 }}>
                    <Card className="border-violet-200 bg-gradient-to-br from-violet-50/70 via-background to-pink-50/70 dark:border-violet-900">
                      <CardHeader>
                        <CardTitle>{item.type}</CardTitle>
                        <CardDescription>{item.usage}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Hiện tại:</span> {item.present}
                          </p>
                          <p>
                            <span className="font-medium">Phủ định:</span> {item.negative}
                          </p>
                          <p>
                            <span className="font-medium">Quá khứ:</span> {item.past}
                          </p>
                          <p>
                            <span className="font-medium">Phủ định quá khứ:</span> {item.pastNegative}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <Card className="mt-4 border-amber-200 bg-gradient-to-br from-amber-50/90 via-background to-rose-50/70 dark:border-amber-900">
                <CardHeader>
                  <CardTitle>Bảng: Bình thường / Quá khứ / Tương lai (Động từ + Tính từ)</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left bg-muted/60">
                        <th className="px-2 py-2">Loại</th>
                        <th className="px-2 py-2">Từ</th>
                        <th className="px-2 py-2">Bình thường</th>
                        <th className="px-2 py-2">Quá khứ</th>
                        <th className="px-2 py-2">Tương lai</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/60">
                        <td className="px-2 py-2 font-medium">Động từ</td>
                        <td className="px-2 py-2">いきます</td>
                        <td className="px-2 py-2">いきます</td>
                        <td className="px-2 py-2">いきました</td>
                        <td className="px-2 py-2">あした いきます</td>
                      </tr>
                      <tr className="border-b border-border/60">
                        <td className="px-2 py-2 font-medium">Tính từ い</td>
                        <td className="px-2 py-2">たかいです</td>
                        <td className="px-2 py-2">たかいです</td>
                        <td className="px-2 py-2">たかかったです</td>
                        <td className="px-2 py-2">あした たかいです</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 font-medium">Tính từ な</td>
                        <td className="px-2 py-2">しずかです</td>
                        <td className="px-2 py-2">しずかです</td>
                        <td className="px-2 py-2">しずかでした</td>
                        <td className="px-2 py-2">あした しずかです</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {highlightNotes.map((note) => (
                  <motion.div key={note.title} whileHover={{ y: -4 }}>
                    <Card className={`border-2 ${note.style}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-foreground/90">{note.content}</CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="kanji">
              <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-background to-sky-50/60 dark:border-indigo-900">
                <CardHeader>
                  <CardTitle>Kanji theo Unit 4 → 7</CardTitle>
                  <CardDescription>
                    Tổng hợp theo format: Hán Việt / Kanji / Hiragana / Ý nghĩa + link flashcard để luyện ghi nhớ.
                  </CardDescription>
                </CardHeader>
                <CardContent>                  
                  <Accordion defaultValue="kanji-unit-0">
                    {kanjiLessons.map((lesson, index) => (
                      <AccordionItem key={lesson.unit} value={`kanji-unit-${index}`}>
                        <AccordionTrigger value={`kanji-unit-${index}`}>
                          <div className="flex items-center gap-2">
                            <Badge>{lesson.unit}</Badge>
                            <Badge variant="secondary">{lesson.items.length} mục</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent value={`kanji-unit-${index}`}>
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {lesson.items.map((item) => (
                              <motion.div key={`${lesson.unit}-${item.hanViet}-${item.kanji}`} whileHover={{ y: -3 }}>
                                <Card className="h-full border-border/80 bg-card/90">
                                  <CardHeader className="pb-3">
                                    <CardDescription>{item.hanViet}</CardDescription>
                                    <CardTitle className="text-3xl tracking-wide">{item.kanji}</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-2 text-sm">
                                    <p className="text-muted-foreground">{item.hira}</p>
                                    <Badge variant="secondary">{item.meaning}</Badge>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section id="ngu-phap" className="reveal-item mt-12">
          <h2 className="text-2xl font-semibold md:text-3xl">Ngữ pháp trọng điểm</h2>
          <p className="mt-2 text-muted-foreground">
            Thiết kế lại theo Unit 4–7: mỗi điểm ngữ pháp là một card ngắn, có mẫu câu, giải thích, ví dụ và lưu ý để học dễ nhớ.
          </p>

          <Card className="mt-5 border-border/80 bg-gradient-to-br from-card via-card to-muted/30">
            <CardContent className="pt-6">
              <Tabs defaultValue="g4">
                <TabsList className="mb-4 w-full justify-start gap-1 overflow-x-auto rounded-2xl bg-muted/60">
                  {grammarUnits.map((unit) => (
                    <TabsTrigger key={unit.id} value={unit.id}>
                      {unit.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {grammarUnits.map((unit) => (
                  <TabsContent key={unit.id} value={unit.id}>
                    <div className={`mb-4 rounded-xl border p-4 ${unit.color}`}>
                      <p className="text-lg font-semibold">{unit.title}</p>
                      <p className="text-sm text-muted-foreground">{unit.subtitle}</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {unit.points.map((point) => (
                        <motion.div key={`${unit.id}-${point.no}`} whileHover={{ y: -3 }}>
                          <Card className="h-full border-border/80 bg-card/90">
                            <CardHeader className="pb-2">
                              <CardDescription className="flex items-center gap-2">
                                <Badge variant="outline">#{point.no}</Badge>
                                <span>{point.topic}</span>
                              </CardDescription>
                              <CardTitle className="text-base leading-snug">{point.pattern}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                              <p>
                                <span className="font-semibold">Giải thích:</span> {point.explain}
                              </p>
                              <p>
                                <span className="font-semibold">Ví dụ:</span> {point.example}
                              </p>
                              {point.note ? (
                                <p className="rounded-md border border-amber-300/70 bg-amber-50/70 p-2 text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
                                  <span className="font-semibold">Lưu ý:</span> {point.note}
                                </p>
                              ) : null}
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
