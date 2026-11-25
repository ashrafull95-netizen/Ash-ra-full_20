/* ==========================================================================
   Nihongo Online Exam — Question Bank (JLPT N5, N4, N3)
   All Japanese text, readings, and explanations carefully verified.
   ========================================================================== */

window.EXAM_DATA = {
  sectionLabels: {
    vocab: "Vocabulary & Kanji",
    grammar: "Grammar",
    reading: "Reading",
    listening: "Listening",
    script: "Script & Vocabulary",
    conversation: "Conversation & Expression"
  },

  trackSections: {
    jlpt: ["vocab", "grammar", "reading", "listening"],
    jft: ["script", "conversation", "listening", "reading"]
  },

  jftLevel: {
    id: "JFT-A2",
    track: "jft",
    code: "JFT-A2",
    tag: "CEFR A2",
    title: "JFT-Basic Practice Exam",
    description: "Practical everyday & workplace Japanese proficiency test (250-point scale, 200+ pass).",
    durationMinutes: 25,
    maxScore: 250,
    passScore: 200
  },

  levels: [
    {
      id: "N5",
      code: "N5",
      tag: "Beginner",
      title: "JLPT N5 Practice Exam",
      description: "Basic kanji, everyday vocabulary, essential particles, and short daily conversations.",
      durationMinutes: 25,
      passScore180: 80,
      sectionMinPct: 32
    },
    {
      id: "N4",
      code: "N4",
      tag: "Elementary",
      title: "JLPT N4 Practice Exam",
      description: "Compound kanji, verb conjugations (passive, potential, causative), and practical passages.",
      durationMinutes: 30,
      passScore180: 90,
      sectionMinPct: 32
    },
    {
      id: "N3",
      code: "N3",
      tag: "Intermediate",
      title: "JLPT N3 Practice Exam",
      description: "Nuanced expressions, formal/informal shifts, workplace reading, and natural spoken Japanese.",
      durationMinutes: 25,
      passScore180: 95,
      sectionMinPct: 32
    }
  ],

  questions: {
    /* ======================================================================
       JLPT N5 (20 Questions: 6 Vocab, 6 Grammar, 4 Reading, 4 Listening)
       ====================================================================== */
    N5: [
      // --- VOCAB & KANJI (6) ---
      {
        id: "n5-v1",
        section: "vocab",
        typeLabel: "Kanji Reading",
        instruction: "Choose the correct reading for the underlined kanji.",
        prompt: "まいあさ <u class=\"q-underline\">電車</u> で がっこうへ いきます。",
        options: ["でんしゃ", "てんしゃ", "でんじゃ", "てんじゃ"],
        answer: 0,
        explanation: "電車 is read でんしゃ (densha), meaning 'train'. Note that 車 becomes しゃ in this compound."
      },
      {
        id: "n5-v2",
        section: "vocab",
        typeLabel: "Kanji Reading",
        instruction: "Choose the correct reading for the underlined kanji.",
        prompt: "この へやは とても <u class=\"q-underline\">広い</u> です。",
        options: ["たかい", "ひろい", "せまい", "ながい"],
        answer: 1,
        explanation: "広い is read ひろい (hiroi), meaning 'spacious / wide'. 狭い (せまい) is its opposite ('narrow')."
      },
      {
        id: "n5-v3",
        section: "vocab",
        typeLabel: "Kanji Writing",
        instruction: "Choose the correct kanji for the underlined hiragana.",
        prompt: "きのう ともだちに <u class=\"q-underline\">てがみ</u> を かきました。",
        options: ["手紙", "新聞", "切手", "雑誌"],
        answer: 0,
        explanation: "てがみ (letter) is written 手紙 (hand + paper). 新聞 is しんぶん (newspaper), 切手 is きって (postage stamp), and 雑誌 is ざっし (magazine)."
      },
      {
        id: "n5-v4",
        section: "vocab",
        typeLabel: "Word Meaning",
        instruction: "Choose the word that best fits the blank.",
        prompt: "あしたの ごご、くうこうへ ともだちを <span class=\"q-blank\"></span> に いきます。",
        options: [
          "<ruby>迎<rt>むか</rt></ruby>え",
          "<ruby>答<rt>こた</rt></ruby>え",
          "<ruby>教<rt>おし</rt></ruby>え",
          "<ruby>覚<rt>おぼ</rt></ruby>え"
        ],
        answer: 0,
        explanation: "迎えに行く (むかえにいく) means 'to go to pick someone up / meet someone'. The other stems mean answer (答え), teach (教え), and remember (覚え)."
      },
      {
        id: "n5-v5",
        section: "vocab",
        typeLabel: "Context Vocabulary",
        instruction: "Choose the word that best fits the blank.",
        prompt: "あついですね。<ruby>窓<rt>まど</rt></ruby>を <span class=\"q-blank\"></span> ましょうか。",
        options: ["あけ", "しめ", "つけ", "けし"],
        answer: 0,
        explanation: "窓をあける (to open the window) fits 'It's hot, isn't it?'. しめる means to close, つける to turn on, and けす to turn off."
      },
      {
        id: "n5-v6",
        section: "vocab",
        typeLabel: "Near Synonym",
        instruction: "Choose the sentence closest in meaning to the given sentence.",
        prompt: "わたしの <ruby>父<rt>ちち</rt></ruby>は <ruby>病院<rt>びょういん</rt></ruby>で <ruby>働<rt>はたら</rt></ruby>いています。",
        options: [
          "ちちは いしゃや かんごしと しごとをしています。",
          "ちちは まいにち びょういんへ かよっています。",
          "ちちは びょういんの となりで やすんでいます。",
          "ちちは いま びょういんに にゅういんしています。"
        ],
        answer: 0,
        explanation: "病院で働いています means 'works at a hospital'. Option 1 ('works with doctors and nurses') matches working at a hospital. Option 2 means visiting as a patient/commuting for treatment."
      },

      // --- GRAMMAR (6) ---
      {
        id: "n5-g1",
        section: "grammar",
        typeLabel: "Particles",
        instruction: "Choose the best particle to fill the blank.",
        prompt: "<ruby>図書館<rt>としょかん</rt></ruby> <span class=\"q-blank\"></span> <ruby>日本語<rt>にほんご</rt></ruby>の <ruby>本<rt>ほん</rt></ruby>を かりました。",
        options: ["で", "へ", "に", "を"],
        answer: 0,
        explanation: "で marks the location where an action takes place ('borrowed a Japanese book at the library')."
      },
      {
        id: "n5-g2",
        section: "grammar",
        typeLabel: "Verb Conjugation",
        instruction: "Choose the grammatically correct option.",
        prompt: "ここに くるまを <span class=\"q-blank\"></span> ください。",
        options: [
          "<ruby>止<rt>と</rt></ruby>めないで",
          "<ruby>止<rt>と</rt></ruby>まらないで",
          "<ruby>止<rt>と</rt></ruby>めなくて",
          "<ruby>止<rt>と</rt></ruby>めなく"
        ],
        answer: 0,
        explanation: "～ないでください means 'Please do not ~'. Also, 止める (とめる) is transitive (taking くるまを), whereas 止まる (とまる) is intransitive."
      },
      {
        id: "n5-g3",
        section: "grammar",
        typeLabel: "Adjective Past Tense",
        instruction: "Choose the correct form to complete the sentence.",
        prompt: "きのうの テストは あまり <span class=\"q-blank\"></span> です。",
        options: [
          "<ruby>難<rt>むずか</rt></ruby>しくなかった",
          "<ruby>難<rt>むずか</rt></ruby>しくない",
          "<ruby>難<rt>むずか</rt></ruby>しかった",
          "<ruby>難<rt>むずか</rt></ruby>しいじゃなかった"
        ],
        answer: 0,
        explanation: "あまり pairs with a negative predicate ('not very ~'). Because きのう (yesterday) is past, the い-adjective 難しい conjugates to 難しくなかったです."
      },
      {
        id: "n5-g4",
        section: "grammar",
        typeLabel: "Desire & Intention",
        instruction: "Choose the best option to complete the sentence.",
        prompt: "<ruby>週末<rt>しゅうまつ</rt></ruby>は <ruby>海<rt>うみ</rt></ruby>へ <span class=\"q-blank\"></span> です。",
        options: [
          "<ruby>行<rt>い</rt></ruby>きたい",
          "<ruby>行<rt>い</rt></ruby>くほしい",
          "<ruby>行<rt>い</rt></ruby>きたがる",
          "<ruby>行<rt>い</rt></ruby>ってほしい"
        ],
        answer: 0,
        explanation: "Verb stem + たいです expresses the speaker's desire ('I want to go to the sea this weekend'). ほしい is used for nouns, not directly after dictionary-form verbs."
      },
      {
        id: "n5-g5",
        section: "grammar",
        typeLabel: "Sentence Ordering",
        instruction: "Which word goes in the ★ position? 「きのう ___ ___ ★ ___ 買いました。」",
        prompt: "「きのう　＿＿＿　＿＿＿　★　＿＿＿　<ruby>買<rt>か</rt></ruby>いました。」",
        options: ["を", "スーパー", "りんご", "で"],
        answer: 2,
        explanation: "The correct sentence order is 「きのう スーパー で りんご を 買いました」 ('I bought apples at the supermarket yesterday'). The word in the ★ (3rd) position is りんご."
      },
      {
        id: "n5-g6",
        section: "grammar",
        typeLabel: "Counters & Time",
        instruction: "Choose the best option to complete the sentence.",
        prompt: "ここから えきまで じてんしゃで 10分 <span class=\"q-blank\"></span> かかります。",
        options: ["ぐらい", "ごろ", "だけ", "しか"],
        answer: 0,
        explanation: "ぐらい (about / approximately) is used with durations and quantities (10分ぐらい = about 10 minutes). ごろ is used for points in time (e.g., 3時ごろ)."
      },

      // --- READING (4) ---
      {
        id: "n5-r1",
        section: "reading",
        typeLabel: "Short Notice",
        passageTitle: "カフェのお知らせ (Café Notice)",
        passage: "「さくらカフェ」は いつも げつようびが やすみです。<br>でも、らいしゅうの げつようび（10月12日）は あいています。<br>かわりに、かようび（10月13日）が やすみになります。<br>じかんは いつもどおり ごぜん9時から ごご7時までです。",
        instruction: "Read the notice and answer the question.",
        prompt: "らいしゅうの 10月12日（げつようび）に さくらカフェへ <ruby>行<rt>い</rt></ruby>くと、どうなりますか。",
        options: [
          "ごぜん9時から ごご7時まで お店に はいれます。",
          "げつようびなので お店は やすみです。",
          "ごごだけ お店が あいています。",
          "10月13日と おなじように やすみです。"
        ],
        answer: 0,
        explanation: "The notice states that although Sakura Café is normally closed on Mondays, next Monday (Oct 12) it will be open as usual from 9:00 AM to 7:00 PM, and Tuesday (Oct 13) will be closed instead."
      },
      {
        id: "n5-r2",
        section: "reading",
        typeLabel: "Short Email",
        passageTitle: "アンナさんからのメール",
        passage: "けんじさんへ<br><br>あしたの <ruby>午後<rt>ごご</rt></ruby>、いっしょに テストの <ruby>勉強<rt>べんきょう</rt></ruby>を しませんか。<br>わたしは 1時に えきの まえの きっさてんに います。<br>あ、きょうかしょを わすれないで くださいね。<br>わたしは ノートと ペンを もっていきます。<br><br>アンナ",
        instruction: "Read the email and answer the question.",
        prompt: "けんじさんは あした なにを もっていかなければなりませんか。",
        options: ["きょうかしょ", "ノート", "ペン", "メール"],
        answer: 0,
        explanation: "Anna writes: 'あ、きょうかしょを わすれないで くださいね' ('Oh, please don't forget your textbook'). Anna is bringing a notebook and pen."
      },
      {
        id: "n5-r3",
        section: "reading",
        typeLabel: "Short Passage",
        passageTitle: "わたしの 日曜日",
        passage: "わたしの うちは いま <ruby>東京<rt>とうきょう</rt></ruby>に ありますが、しゅっしんは <ruby>北海道<rt>ほっかいどう</rt></ruby>です。<br>まいにち かいしゃが いそがしいので、<ruby>日曜日<rt>にちようび</rt></ruby>は よく こうえんを さんぽします。<br>きのうは <ruby>天気<rt>てんき</rt></ruby>が よかったですから、こうえんで しゃしんを たくさん とりました。<br>そのあと、ちかくの パンやで パンを かって うちへ かえりました。",
        instruction: "Read the passage and choose the true statement.",
        prompt: "この ぶんしょうの ないようと あっているものは どれですか。",
        options: [
          "このひとは きのう こうえんで しゃしんを とりました。",
          "このひとは いま 北海道に すんでいます。",
          "このひとは きのう パンやで コーヒーを のみました。",
          "このひとは 日曜日も かいしゃで はたらいています。"
        ],
        answer: 0,
        explanation: "The author says 'きのうは 天気が よかったですから、こうえんで しゃしんを たくさん とりました' ('Because the weather was nice yesterday, I took many photos at the park')."
      },
      {
        id: "n5-r4",
        section: "reading",
        typeLabel: "Information Retrieval",
        passageTitle: "クラスのスキーりょこう",
        passage: "日：1月20日（どようび）<br>あつまる じかん：あさ 7時30分（バスは 7時45分に でます）<br>あつまる ばしょ：がっこうの みなみぐち<br>おかね：5,000円（バスの おかねと ひるごはんを ふくみます）<br>※ あたたかい ふくを きてきて ください。",
        instruction: "Read the travel flyer and answer the question.",
        prompt: "バスは なんじに でますか。",
        options: ["7時45分", "7時30分", "7時15分", "8時00分"],
        answer: 0,
        explanation: "Meeting time (あつまる じかん) is 7:30, and the bus departs at 7:45 (バスは 7時45分に でます)."
      },

      // --- LISTENING (4) ---
      {
        id: "n5-l1",
        section: "listening",
        typeLabel: "Task-Based Listening",
        instruction: "Listen to the dialogue and choose what the woman will buy.",
        prompt: "<ruby>女<rt>おんな</rt></ruby>のひとは なにを <ruby>買<rt>か</rt></ruby>いますか。",
        audioText: "男の人：あ、飲み物を買ってきますね。お茶がいいですか、コーヒーがいいですか。 女の人：すみません、わたしは甘いものが飲みたいです。オレンジジュースをお願いします。 男の人：わかりました。じゃあ、ぼくは温かいお茶にします。",
        audioScriptHtml: "<strong>男：</strong>あ、<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>を<ruby>買<rt>か</rt></ruby>ってきますね。お<ruby>茶<rt>ちゃ</rt></ruby>がいいですか、コーヒーがいいですか。<br><strong>女：</strong>すみません、わたしは<ruby>甘<rt>あま</rt></ruby>いものが<ruby>飲<rt>の</rt></ruby>みたいです。オレンジジュースをお<ruby>願<rt>ねが</rt></ruby>いします。<br><strong>男：</strong>わかりました。じゃあ、ぼくは<ruby>温<rt>あたた</rt></ruby>かいお<ruby>茶<rt>ちゃ</rt></ruby>にします。",
        options: [
          "オレンジジュース",
          "<ruby>温<rt>あたた</rt></ruby>かいお<ruby>茶<rt>ちゃ</rt></ruby>",
          "コーヒー",
          "<ruby>冷<rt>つめ</rt></ruby>たいお<ruby>茶<rt>ちゃ</rt></ruby>"
        ],
        answer: 0,
        explanation: "The woman says she wants something sweet and asks for orange juice (オレンジジュースをお願いします). The man gets hot tea for himself."
      },
      {
        id: "n5-l2",
        section: "listening",
        typeLabel: "Time & Schedule",
        instruction: "Listen to the conversation and choose the correct time.",
        prompt: "<ruby>映画<rt>えいが</rt></ruby>は なんじに はじまりますか。",
        audioText: "女の人：たなかさん、映画は何時からですか。2時ですか。 男の人：いいえ、2時はレストランを予約した時間です。映画は3時半からです。でも、3時に映画館の前で会いましょう。 女の人：はい、わかりました。",
        audioScriptHtml: "<strong>女：</strong>たなかさん、<ruby>映画<rt>えいが</rt></ruby>は<ruby>何時<rt>なんじ</rt></ruby>からですか。2<ruby>時<rt>じ</rt></ruby>ですか。<br><strong>男：</strong>いいえ、2<ruby>時<rt>じ</rt></ruby>はレストランを<ruby>予約<rt>よやく</rt></ruby>した<ruby>時間<rt>じかん</rt></ruby>です。<ruby>映画<rt>えいが</rt></ruby>は3<ruby>時半<rt>じはん</rt></ruby>からです。でも、3<ruby>時<rt>じ</rt></ruby>に<ruby>映画館<rt>えいがかん</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>で<ruby>会<rt>あ</rt></ruby>いましょう。<br><strong>女：</strong>はい、わかりました。",
        options: ["3時30分", "2時00分", "3時00分", "2時30分"],
        answer: 0,
        explanation: "2:00 is the restaurant reservation, 3:00 is when they meet in front of the cinema, and the movie itself starts at 3:30 (3時半からです)."
      },
      {
        id: "n5-l3",
        section: "listening",
        typeLabel: "Quick Response",
        instruction: "Listen to the prompt and choose the most natural response.",
        prompt: "お<ruby>話<rt>はなし</rt></ruby>を <ruby>聞<rt>き</rt></ruby>いて、いちばん いい <ruby>返事<rt>へんじ</rt></ruby>を えらんでください。",
        audioText: "すみません、このペンを借りてもいいですか。",
        audioScriptHtml: "「すみません、このペンを<ruby>借<rt>か</rt></ruby>りてもいいですか。」",
        options: [
          "ええ、どうぞ。",
          "いいえ、かります。",
          "はい、かえします。",
          "すみません、そうですか。"
        ],
        answer: 0,
        explanation: "'すみません、このペンを借りてもいいですか' means 'Excuse me, may I borrow this pen?'. 'ええ、どうぞ' ('Yes, go ahead') is the natural polite response."
      },
      {
        id: "n5-l4",
        section: "listening",
        typeLabel: "Key Point Comprehension",
        instruction: "Listen to the dialogue and answer why the man was late.",
        prompt: "<ruby>男<rt>おとこ</rt></ruby>のひとは どうして おくれましたか。",
        audioText: "女の人：おはようございます。ずいぶん遅かったですね。バスが来なかったんですか。 男の人：いいえ、バスは時間通りでしたが、財布を家に忘れて、取りに帰ったんです。 女の人：それは大変でしたね。",
        audioScriptHtml: "<strong>女：</strong>おはようございます。ずいぶん<ruby>遅<rt>おそ</rt></ruby>かったですね。バスが<ruby>来<rt>こ</rt></ruby>なかったんですか。<br><strong>男：</strong>いいえ、バスは<ruby>時間通<rt>じかんどお</rt></ruby>りでしたが、<ruby>財布<rt>さいふ</rt></ruby>を<ruby>家<rt>いえ</rt></ruby>に<ruby>忘<rt>わす</rt></ruby>れて、<ruby>取<rt>と</rt></ruby>りに<ruby>帰<rt>かえ</rt></ruby>ったんです。<br><strong>女：</strong>それは<ruby>大変<rt>たいへん</rt></ruby>でしたね。",
        options: [
          "さいふを うちに わすれたから",
          "バスが こなかったから",
          "あさ おそく おきたから",
          "道が こんでいたから"
        ],
        answer: 0,
        explanation: "The man explains that the bus was on time, but he forgot his wallet at home and went back to get it (財布を家に忘れて、取りに帰ったんです)."
      }
    ],

    /* ======================================================================
       JLPT N4 (20 Questions: 6 Vocab, 6 Grammar, 4 Reading, 4 Listening)
       ====================================================================== */
    N4: [
      // --- VOCAB & KANJI (6) ---
      {
        id: "n4-v1",
        section: "vocab",
        typeLabel: "Kanji Reading",
        instruction: "Choose the correct reading for the underlined kanji.",
        prompt: "しごとの <u class=\"q-underline\">経験</u> が あまり ありません。",
        options: ["けいけん", "けいげん", "きゅうけん", "きょうけん"],
        answer: 0,
        explanation: "経験 is read けいけん (keiken) and means 'experience'."
      },
      {
        id: "n4-v2",
        section: "vocab",
        typeLabel: "Kanji Reading",
        instruction: "Choose the correct reading for the underlined kanji.",
        prompt: "この <u class=\"q-underline\">建物</u> は とても 古いです。",
        options: ["たてもの", "けんぶつ", "たてもん", "つくもの"],
        answer: 0,
        explanation: "建物 is read たてもの (tatemono), meaning 'building'."
      },
      {
        id: "n4-v3",
        section: "vocab",
        typeLabel: "Kanji Writing",
        instruction: "Choose the correct kanji for the underlined hiragana.",
        prompt: "あしたの パーティーの <u class=\"q-underline\">じゅんび</u> を します。",
        options: ["準備", "紹介", "説明", "案内"],
        answer: 0,
        explanation: "じゅんび (preparation) is written 準備. 紹介 is しょうかい (introduction), 説明 is せつめい (explanation), and 案内 is あんない (guidance)."
      },
      {
        id: "n4-v4",
        section: "vocab",
        typeLabel: "Context Vocabulary",
        instruction: "Choose the word that best fits the blank.",
        prompt: "かぜが なかなか <span class=\"q-blank\"></span> なくて、こまっています。",
        options: [
          "<ruby>治<rt>なお</rt></ruby>ら",
          "<ruby>直<rt>なお</rt></ruby>さ",
          "<ruby>変<rt>か</rt></ruby>わら",
          "<ruby>消<rt>き</rt></ruby>え"
        ],
        answer: 0,
        explanation: "かぜが治る (かぜがなおる) means 'to recover from a cold'. Here it is in the negative conditional/te-form: 治らなくて."
      },
      {
        id: "n4-v5",
        section: "vocab",
        typeLabel: "Adverbs",
        instruction: "Choose the adverb that best fits the blank.",
        prompt: "<ruby>日本<rt>にほん</rt></ruby>の <ruby>生活<rt>せいかつ</rt></ruby>に <span class=\"q-blank\"></span> <ruby>慣<rt>な</rt></ruby>れてきました。",
        options: ["だんだん", "ぜんぜん", "めったに", "かならず"],
        answer: 0,
        explanation: "だんだん ('gradually') pairs naturally with ～てきました ('have come to get used to'). ぜんぜん and めったに require negatives."
      },
      {
        id: "n4-v6",
        section: "vocab",
        typeLabel: "Word Usage",
        instruction: "Choose the sentence where the underlined word is used correctly.",
        prompt: "「<u class=\"q-underline\">まじめ</u>」の つかいかたが 正しい ものは どれですか。",
        options: [
          "たかはしさんは まじめな 人だから、約束を かならず 守ります。",
          "この カレーは とても まじめで おいしいです。",
          "きのう かった くつは まじめで 歩きやすいです。",
          "天気よほうによると、あしたは まじめに 雨が ふるそうです。"
        ],
        answer: 0,
        explanation: "まじめ (serious, earnest, diligent) describes a person's character or attitude, as in 'Takahashi-san is a serious/reliable person, so he always keeps promises.'"
      },

      // --- GRAMMAR (6) ---
      {
        id: "n4-g1",
        section: "grammar",
        typeLabel: "Passive Voice",
        instruction: "Choose the correct passive form to complete the sentence.",
        prompt: "きのう、わたしは ちちに <ruby>日記<rt>にっき</rt></ruby>を <span class=\"q-blank\"></span> て しまいました。",
        options: [
          "<ruby>見<rt>み</rt></ruby>られ",
          "<ruby>見<rt>み</rt></ruby>させ",
          "<ruby>見<rt>み</rt></ruby>え",
          "<ruby>見<rt>み</rt></ruby>て"
        ],
        answer: 0,
        explanation: "わたしは ちちに 日記を 見られてしまいました uses the adversative passive (見られる) to express that the speaker's diary was read by their father to their dismay."
      },
      {
        id: "n4-g2",
        section: "grammar",
        typeLabel: "Giving & Receiving",
        instruction: "Choose the correct verb to complete the sentence.",
        prompt: "<ruby>誕生日に<rt>たんじょうびに</rt></ruby> ともだちが すてきな 花を <span class=\"q-blank\"></span>。",
        options: ["くれました", "あげました", "もらいました", "さしあげました"],
        answer: 0,
        explanation: "When someone else (ともだちが) gives something to you (the speaker), use くれました. もらいました would require ともだちに / ともだちから."
      },
      {
        id: "n4-g3",
        section: "grammar",
        typeLabel: "Conditionals",
        instruction: "Choose the best conditional expression.",
        prompt: "いくら <span class=\"q-blank\"></span>、この <ruby>漢字<rt>かんじ</rt></ruby>を おぼえることが できません。",
        options: [
          "<ruby>練習<rt>れんしゅう</rt></ruby>しても",
          "<ruby>練習<rt>れんしゅう</rt></ruby>すれば",
          "<ruby>練習<rt>れんしゅう</rt></ruby>したら",
          "<ruby>練習<rt>れんしゅう</rt></ruby>すると"
        ],
        answer: 0,
        explanation: "いくら ～ても means 'no matter how much one does ~' ('No matter how much I practice, I cannot remember this kanji')."
      },
      {
        id: "n4-g4",
        section: "grammar",
        typeLabel: "Keigo / Honorifics",
        instruction: "Choose the polite/honorific expression used by a shop clerk.",
        prompt: "（店で）<ruby>店員<rt>てんいん</rt></ruby>：「<ruby>少<rt>すこ</rt></ruby>し お<ruby>待<rt>ま</rt></ruby>ち <span class=\"q-blank\"></span>。」",
        options: ["ください", "いたします", "まいります", "おります"],
        answer: 0,
        explanation: "お + Verb stem + ください is the standard polite request form ('Please wait a moment'). いたします/まいります/おります are humble forms for the speaker's own actions."
      },
      {
        id: "n4-g5",
        section: "grammar",
        typeLabel: "Hearsay & Appearance",
        instruction: "Choose the correct expression for hearsay.",
        prompt: "ニュースに よると、らいしゅうから <ruby>気温<rt>きおん</rt></ruby>が <span class=\"q-blank\"></span> そうです。",
        options: [
          "<ruby>下<rt>さ</rt></ruby>がる",
          "<ruby>下<rt>さ</rt></ruby>がり",
          "<ruby>下<rt>さ</rt></ruby>がって",
          "<ruby>下<rt>さ</rt></ruby>がったの"
        ],
        answer: 0,
        explanation: "～によると ... Plain Form + そうです expresses hearsay ('According to the news, I heard temperatures will drop starting next week'). Verb stem + そうです means 'looks like / about to'."
      },
      {
        id: "n4-g6",
        section: "grammar",
        typeLabel: "Attempt / Try",
        instruction: "Choose the best option to complete the sentence.",
        prompt: "おいしいか どうか、ひとくち <span class=\"q-blank\"></span> みました。",
        options: [
          "<ruby>食<rt>た</rt></ruby>べて",
          "<ruby>食<rt>た</rt></ruby>べる",
          "<ruby>食<rt>た</rt></ruby>べようと",
          "<ruby>食<rt>た</rt></ruby>べた"
        ],
        answer: 0,
        explanation: "Verb て-form + みる means 'to try doing something to see what happens' ('I tried taking a bite to see if it was delicious')."
      },

      // --- READING (4) ---
      {
        id: "n4-r1",
        section: "reading",
        typeLabel: "Short Passage",
        passageTitle: "えきの コインロッカー",
        passage: "わたしの まちの えきには、おおきい コインロッカーと ちいさい コインロッカーが あります。<br>ちいさい ロッカーは 一日 300円で、おおきい ロッカーは 500円です。<br>朝 8時から 夜 11時まで つかうことが できますが、夜 11時を すぎると、つぎの日の 朝まで にもつを とりだすことが できません。",
        instruction: "Read the passage and answer the question.",
        prompt: "コインロッカーについて、正しい ものは どれですか。",
        options: [
          "夜 11時30分には にもつを とりだすことが できません。",
          "ちいさい ロッカーは 一日 500円です。",
          "24時間 いつでも にもつを だすことが できます。",
          "おおきい ロッカーは 朝 8時まえでも つかえます。"
        ],
        answer: 0,
        explanation: "The passage explains that after 11:00 PM (夜11時をすぎると), you cannot take your luggage out until the next morning."
      },
      {
        id: "n4-r2",
        section: "reading",
        typeLabel: "Business / School Email",
        passageTitle: "アルバイトの れんらく",
        passage: "さとうさん<br><br>おつかれさまです。店長の 山田です。<br>今週の 土よう日、午後 2時から シフトに 入っていましたが、5時からに 変更できませんか。<br>まえの 時間の 人が ふえたので、おねがいしたいです。<br>もし むずかしかったら、木よう日までに 電話で 知らせてください。<br><br>山田",
        instruction: "Read the message and answer the question.",
        prompt: "さとうさんは 5時から 働くことが できない ばあい、どうすれば いいですか。",
        options: [
          "木よう日までに 山田さんに 電話します。",
          "土よう日の 午後 2時に 店へ 行きます。",
          "木よう日に メールで へんじを します。",
          "なにも しないで そのまま 待ちます。"
        ],
        answer: 0,
        explanation: "Yamada writes: 'もし むずかしかったら、木よう日までに 電話で 知らせてください' ('If that is difficult, please let me know by phone by Thursday')."
      },
      {
        id: "n4-r3",
        section: "reading",
        typeLabel: "Mid-Length Essay",
        passageTitle: "日本語の べんきょうと 料理",
        passage: "わたしは 日本に 来てから、日本の 料理を 作るように なりました。<br>はじめは スーパーで 材料の 名前が 読めなくて 困りましたが、スマホで 調べながら 買いました。<br>さいきんは おばあさんに 教わった カレーや みそ汁を 週に 三回ぐらい 作ります。<br>料理を しながら、台所で つかう 日本語も たくさん 覚えることが できました。",
        instruction: "Read the essay and answer the question.",
        prompt: "このひとは 日本で 料理を 作るように なって、どんな いいことが ありましたか。",
        options: [
          "台所で つかう 日本語を たくさん 覚えられました。",
          "スーパーで 働けるように なりました。",
          "料理の 本を 書くことが できました。",
          "スマホを つかわなくても 漢字が 全部 読めました。"
        ],
        answer: 0,
        explanation: "The final sentence states: 'While cooking, I was also able to learn many Japanese words used in the kitchen.'"
      },
      {
        id: "n4-r4",
        section: "reading",
        typeLabel: "Cause & Reasoning",
        passageTitle: "ごみ出しの ルール",
        passage: "この マンションでは、もえる ごみは 火よう日と 金よう日の 朝 8時半までに 出さなければなりません。<br>きのうの 夜、ごみ置き場に だれかが ごみを 置いていましたが、夜のうちに 出すのは きんしされています。<br>カラスなどが ごみぶくろを やぶってしまう からです。",
        instruction: "Read the rule and answer the question.",
        prompt: "どうして 夜のうちに ごみを 出しては いけませんか。",
        options: [
          "カラスなどが ごみぶくろを やぶる からです。",
          "朝 8時半に マンションが しまる からです。",
          "火よう日と 金よう日は 収集車が 来ない からです。",
          "ごみ置き場が せまくて 入らない からです。"
        ],
        answer: 0,
        explanation: "The last sentence explicitly gives the reason: 'Because crows and other animals tear open the garbage bags' (カラスなどが ごみぶくろを やぶってしまう からです)."
      },

      // --- LISTENING (4) ---
      {
        id: "n4-l1",
        section: "listening",
        typeLabel: "Task-Based Listening",
        instruction: "Listen to the conversation and choose what the man will do first.",
        prompt: "<ruby>男<rt>おとこ</rt></ruby>のひとは これから まず なにを しますか。",
        audioText: "女の人：山本さん、会議の資料はコピーしましたか。 男の人：あ、すみません。まだです。これからコピーして、会議室に並べます。 女の人：そうですか。じゃあ、会議室のエアコンはわたしがつけておきますね。 男の人：ありがとうございます。では、すぐコピーしてきます。",
        audioScriptHtml: "<strong>女：</strong>山本さん、<ruby>会議<rt>かいぎ</rt></ruby>の<ruby>資料<rt>しりょう</rt></ruby>はコピーしましたか。<br><strong>男：</strong>あ、すみません。まだです。これからコピーして、<ruby>会議室<rt>かいぎしつ</rt></ruby>に<ruby>並<rt>なら</rt></ruby>べます。<br><strong>女：</strong>そうですか。じゃあ、<ruby>会議室<rt>かいぎしつ</rt></ruby>のエアコンはわたしがつけておきますね。<br><strong>男：</strong>ありがとうございます。では、すぐコピーしてきます。",
        options: [
          "<ruby>資料<rt>しりょう</rt></ruby>を コピーする",
          "<ruby>会議室<rt>かいぎしつ</rt></ruby>の エアコンを つける",
          "<ruby>会議<rt>かいぎ</rt></ruby>を はじめる",
          "<ruby>資料<rt>しりょう</rt></ruby>を 書きなおす"
        ],
        answer: 0,
        explanation: "Yamamoto says 'では、すぐコピーしてきます' ('Then I'll go make the copies right away'). The woman turns on the AC."
      },
      {
        id: "n4-l2",
        section: "listening",
        typeLabel: "Detail Comprehension",
        instruction: "Listen to the weather report and choose the correct statement.",
        prompt: "あしたの <ruby>天気<rt>てんき</rt></ruby>は どうなりますか。",
        audioText: "アナウンサー：明日の天気をお伝えします。朝のうちはよく晴れますが、昼ごろから雲が増えて、夕方からは雨が降るでしょう。お出かけの時は、折り畳み傘を持って行ったほうがよさそうです。",
        audioScriptHtml: "<strong>アナウンサー：</strong><ruby>明日<rt>あした</rt></ruby>の<ruby>天気<rt>てんき</rt></ruby>をお<ruby>伝<rt>つた</rt></ruby>えします。<ruby>朝<rt>あさ</rt></ruby>のうちはよく<ruby>晴<rt>は</rt></ruby>れますが、<ruby>昼<rt>ひる</rt></ruby>ごろから<ruby>雲<rt>くも</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>えて、<ruby>夕方<rt>ゆうがた</rt></ruby>からは<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>るでしょう。お<ruby>出<rt>で</rt></ruby>かけの<ruby>時<rt>とき</rt></ruby>は、<ruby>折<rt>お</rt></ruby>り<ruby>畳<rt>たた</rt></ruby>み<ruby>傘<rt>がさ</rt></ruby>を<ruby>持<rt>も</rt></ruby>って<ruby>行<rt>い</rt></ruby>ったほうがよさそうです。",
        options: [
          "<ruby>朝<rt>あさ</rt></ruby>は 晴れて、<ruby>夕方<rt>ゆうがた</rt></ruby>から 雨が ふる",
          "一日中 ずっと 雨が ふる",
          "<ruby>朝<rt>あさ</rt></ruby>は 雨が ふり、<ruby>午後<rt>ごご</rt></ruby>から 晴れる",
          "一日中 よく 晴れる"
        ],
        answer: 0,
        explanation: "The announcer says it will be sunny in the morning (朝のうちはよく晴れますが), cloudy around noon, and rainy from the evening (夕方からは雨が降るでしょう)."
      },
      {
        id: "n4-l3",
        section: "listening",
        typeLabel: "Polite Expression",
        instruction: "Listen to the situation and choose the appropriate response.",
        prompt: "お<ruby>話<rt>はなし</rt></ruby>を <ruby>聞<rt>き</rt></ruby>いて、いちばん いい <ruby>返事<rt>へんじ</rt></ruby>を えらんでください。",
        audioText: "男の人：先生、今日の授業の内容がよくわからなかったので、もう一度説明していただけませんか。",
        audioScriptHtml: "<strong>男：</strong><ruby>先生<rt>せんせい</rt></ruby>、<ruby>今日<rt>きょう</rt></ruby>の<ruby>授業<rt>じゅぎょう</rt></ruby>の<ruby>内容<rt>ないよう</rt></ruby>がよくわからなかったので、もう<ruby>一度<rt>いちど</rt></ruby><ruby>説明<rt>せつめい</rt></ruby>していただけませんか。",
        options: [
          "いいですよ。どこが わかりにくかったですか。",
          "はい、せつめいして ください。",
          "すみません、よく わかりました。",
          "いいえ、わたしが せつめいしました。"
        ],
        answer: 0,
        explanation: "The student politely asks the teacher to explain the lesson again (説明していただけませんか). 'いいですよ。どこが わかりにくかったですか' ('Sure, which part was hard to understand?') is the natural reply."
      },
      {
        id: "n4-l4",
        section: "listening",
        typeLabel: "Decision & Reason",
        instruction: "Listen to the conversation and choose which apartment the woman prefers.",
        prompt: "<ruby>女<rt>おんな</rt></ruby>のひとは どうして <ruby>駅<rt>えき</rt></ruby>の 近くの 部屋を えらばなかったのですか。",
        audioText: "男の人：引っ越す部屋は決まりましたか。駅の近くのマンションはどうでしたか。 女の人：駅から歩いて二分ですごく便利だったんですが、近くに大きな道路があって、夜もうるさそうだったんです。それで、少し遠くても静かなアパートにしました。",
        audioScriptHtml: "<strong>男：</strong><ruby>引<rt>ひ</rt></ruby>っ<ruby>越<rt>こ</rt></ruby>す<ruby>部屋<rt>へや</rt></ruby>は<ruby>決<rt>き</rt></ruby>まりましたか。<ruby>駅<rt>えき</rt></ruby>の<ruby>近<rt>ちか</rt></ruby>くのマンションはどうでしたか。<br><strong>女：</strong><ruby>駅<rt>えき</rt></ruby>から<ruby>歩<rt>ある</rt></ruby>いて<ruby>二分<rt>にふん</rt></ruby>ですごく<ruby>便利<rt>べんり</rt></ruby>だったんですが、<ruby>近<rt>ちか</rt></ruby>くに<ruby>大<rt>おお</rt></ruby>きな<ruby>道路<rt>どうろ</rt></ruby>があって、<ruby>夜<rt>よる</rt></ruby>もうるさそうだったんです。それで、<ruby>少<rt>すこ</rt></ruby>し<ruby>遠<rt>とお</rt></ruby>くても<ruby>静<rt>しず</rt></ruby>かなアパートにしました。",
        options: [
          "大きな 道路の 近くで うるさそうだったから",
          "やちんが とても 高かったから",
          "部屋が せまくて 日あたりが 悪かったから",
          "駅から 遠くて 不便だったから"
        ],
        answer: 0,
        explanation: "Although the condo was 2 minutes from the station, there was a big road nearby and it seemed noisy at night (夜もうるさそうだったんです)."
      }
    ],

    /* ======================================================================
       JLPT N3 (16 Questions: 5 Vocab, 5 Grammar, 3 Reading, 3 Listening)
       ====================================================================== */
    N3: [
      // --- VOCAB & KANJI (5) ---
      {
        id: "n3-v1",
        section: "vocab",
        typeLabel: "Kanji Reading",
        instruction: "Choose the correct reading for the underlined kanji.",
        prompt: "この 計画を <u class=\"q-underline\">実現</u> するために 努力しています。",
        options: ["じつげん", "じっけん", "じつぜん", "しつげん"],
        answer: 0,
        explanation: "実現 is read じつげん (jitsugen), meaning 'realization / putting into practice'."
      },
      {
        id: "n3-v2",
        section: "vocab",
        typeLabel: "Kanji Writing",
        instruction: "Choose the correct kanji for the underlined hiragana.",
        prompt: "会議で <u class=\"q-underline\">ぎろん</u> が 盛り上がった。",
        options: ["議論", "意見", "相談", "批判"],
        answer: 0,
        explanation: "ぎろん (discussion / debate) is written 議論. 意見 is いけん (opinion), 相談 is そうだん (consultation), 批判 is ひはん (criticism)."
      },
      {
        id: "n3-v3",
        section: "vocab",
        typeLabel: "Context Vocabulary",
        instruction: "Choose the word that best fits the blank.",
        prompt: "新製品の 売り上げが <span class=\"q-blank\"></span> 伸びている。",
        options: [
          "<ruby>順調<rt>じゅんちょう</rt></ruby>に",
          "<ruby>偶然<rt>ぐうぜん</rt></ruby>に",
          "<ruby>正直<rt>しょうじき</rt></ruby>に",
          "<ruby>真剣<rt>しんけん</rt></ruby>に"
        ],
        answer: 0,
        explanation: "順調に伸びる (じゅんちょうにのびる) means 'to grow steadily / smoothly'."
      },
      {
        id: "n3-v4",
        section: "vocab",
        typeLabel: "Near Synonym",
        instruction: "Choose the closest synonym to the underlined word.",
        prompt: "電車が <u class=\"q-underline\">まもなく</u> 到着します。",
        options: ["もうすぐ", "さっき", "ようやく", "ついに"],
        answer: 0,
        explanation: "まもなく ('shortly / in a moment') is synonymous with もうすぐ ('soon'). ようやく means 'finally (after long effort)'."
      },
      {
        id: "n3-v5",
        section: "vocab",
        typeLabel: "Collocation",
        instruction: "Choose the phrase that best completes the sentence.",
        prompt: "体調を <span class=\"q-blank\"></span> ないよう、十分に 睡眠を とってください。",
        options: [
          "<ruby>崩<rt>くず</rt></ruby>さ",
          "<ruby>壊<rt>こわ</rt></ruby>さ",
          "<ruby>破<rt>やぶ</rt></ruby>ら",
          "<ruby>落<rt>お</rt></ruby>とさ"
        ],
        answer: 0,
        explanation: "体調を崩す (たいちょうをくずす) is the fixed collocation meaning 'to fall ill / get out of shape'."
      },

      // --- GRAMMAR (5) ---
      {
        id: "n3-g1",
        section: "grammar",
        typeLabel: "Grammar Pattern",
        instruction: "Choose the best grammar expression for the blank.",
        prompt: "この <ruby>料理<rt>りょうり</rt></ruby>は まるで プロが <ruby>作<rt>つく</rt></ruby>った <span class=\"q-blank\"></span> おいしい。",
        options: ["かのように", "ばかりだ", "わけだ", "はずがない"],
        answer: 0,
        explanation: "まるで ～かのように means 'just as if ~' ('This dish is so delicious it's as if a professional made it')."
      },
      {
        id: "n3-g2",
        section: "grammar",
        typeLabel: "Concession",
        instruction: "Choose the best expression to complete the sentence.",
        prompt: "この 町は <ruby>交通<rt>こうつう</rt></ruby>が 便利な <span class=\"q-blank\"></span>、家賃が かなり 高い。",
        options: ["反面", "おかげで", "せいで", "ついでに"],
        answer: 0,
        explanation: "～反面 (はんめん, 'on the other hand') contrasts a positive aspect ('convenient transit') with a negative one ('quite high rent')."
      },
      {
        id: "n3-g3",
        section: "grammar",
        typeLabel: "Tendency / Change",
        instruction: "Choose the best expression to complete the sentence.",
        prompt: "最近は キャッシュレスで 支払う 人が <span class=\"q-blank\"></span>。",
        options: [
          "<ruby>増<rt>ふ</rt></ruby>えつつある",
          "<ruby>増<rt>ふ</rt></ruby>えるわけがない",
          "<ruby>増<rt>ふ</rt></ruby>えっこない",
          "<ruby>増<rt>ふ</rt></ruby>えるばかりだめだ"
        ],
        answer: 0,
        explanation: "Verb stem + つつある indicates an ongoing trend or change ('are steadily increasing')."
      },
      {
        id: "n3-g4",
        section: "grammar",
        typeLabel: "Condition & Exception",
        instruction: "Choose the best grammar pattern.",
        prompt: "台風などの <ruby>悪天候<rt>あくてんこう</rt></ruby>で <span class=\"q-blank\"></span>、イベントは 予定通り 開催します。",
        options: ["ないかぎり", "ばかりに", "どころか", "ものの"],
        answer: 0,
        explanation: "～ないかぎり ('unless ~') fits: 'Unless there is severe weather such as a typhoon, the event will be held as scheduled.'"
      },
      {
        id: "n3-g5",
        section: "grammar",
        typeLabel: "Formal Cause",
        instruction: "Choose the best expression to complete the notice.",
        prompt: "<ruby>大雪<rt>おおゆき</rt></ruby>に <span class=\"q-blank\"></span>、本日の 午後の 列車は すべて 運休となります。",
        options: ["ともない", "かかわらず", "かわり", "ついて"],
        answer: 0,
        explanation: "～に伴い (にともない, 'due to / accompanying ~') is commonly used in formal announcements about weather or schedule changes."
      },

      // --- READING (3) ---
      {
        id: "n3-r1",
        section: "reading",
        typeLabel: "Workplace Memo",
        passageTitle: "社内システム メンテナンスのお知らせ",
        passage: "社員各位<br><br>セキュリティ強化のため、今週末の日曜日（午前2時〜午前6時）に社内ポータルのメンテナンスを実施します。<br>作業中はファイルサーバーへのアクセスおよびメールの送受信ができなくなりますのでご注意ください。<br>なお、緊急の連絡が必要な場合は、事前に各部署の責任者へ共有されている緊急連絡先をご利用ください。",
        instruction: "Read the internal memo and answer the question.",
        prompt: "メンテナンス中について、正しいものは どれですか。",
        options: [
          "午前2時から6時までは 社内メールの 送受信ができない。",
          "緊急の場合も だれにも 連絡する 方法がない。",
          "メンテナンスは 平日の 昼間に 行われる。",
          "ファイルサーバーだけは 作業中も 利用できる。"
        ],
        answer: 0,
        explanation: "During the Sunday 2:00–6:00 AM maintenance window, both file server access and sending/receiving email are unavailable."
      },
      {
        id: "n3-r2",
        section: "reading",
        typeLabel: "Opinion Passage",
        passageTitle: "「メモを取る」ということ",
        passage: "最近は会議の内容を録音したり、パソコンで記録したりする人が増えている。もちろん正確な記録を残す点では便利だが、私はやはり手書きでメモを取ることを勧めたい。<br>なぜなら、自分の手で書こうとすると、話の要点がどこにあるかを瞬時に判断し、整理しなければならないからだ。つまり、メモを取る作業そのものが、内容への理解を深める訓練になるのである。",
        instruction: "Read the passage and identify the author's main reason.",
        prompt: "筆者が 手書きの メモを 勧める いちばんの 理由は なんですか。",
        options: [
          "話を整理しながら書くことで、理解が深まるから。",
          "録音するよりも、正確な文字として残しやすいから。",
          "パソコンを使えない会議室が多いから。",
          "あとで他の人に共有しやすいから。"
        ],
        answer: 0,
        explanation: "The author explains that writing notes by hand forces you to quickly identify and organize key points, which deepens your understanding of the content."
      },
      {
        id: "n3-r3",
        section: "reading",
        typeLabel: "Comparison Passage",
        passageTitle: "電子書籍と 紙の本",
        passage: "電子書籍は、スマートフォンやタブレット一つで何百冊もの本を持ち運べるうえ、文字の大きさも自由に変更できるという利点がある。<br>一方で、紙の本にはページの厚みや手触りがあり、どこまで読んだかを感覚的に把握しやすいという魅力がある。どちらが優れているかではなく、移動中は電子書籍、自宅でじっくり読む時は紙の本というように、目的に応じて使い分けるのが賢い方法だろう。",
        instruction: "Read the passage and answer the question.",
        prompt: "筆者は 電子書籍と 紙の本について どのように 考えていますか。",
        options: [
          "それぞれの良さを生かし、場面に合わせて使い分けるのがよい。",
          "利点が多いので、これからは電子書籍だけを使うべきだ。",
          "紙の本のほうが読みやすいので、電子書籍はあまり勧められない。",
          "文字の大きさを変えられる点で、紙の本が優れている。"
        ],
        answer: 0,
        explanation: "The author concludes it is not about which is superior, but rather wisely choosing between them based on purpose (目的に応じて使い分ける)."
      },

      // --- LISTENING (3) ---
      {
        id: "n3-l1",
        section: "listening",
        typeLabel: "Workplace Dialogue",
        instruction: "Listen to the conversation and choose what the woman suggests.",
        prompt: "<ruby>女<rt>おんな</rt></ruby>のひとは <ruby>提案書<rt>ていあんしょ</rt></ruby>について どうするのが いいと 言っていますか。",
        audioText: "男の人：部長、来週のクライアント向けの提案書、一応完成したんですが、目を通していただけますか。 女の人：うん、データがよくまとまっているね。ただ、最初のページだけ少し文字が多すぎる気がするな。図やグラフを増やして、一目で内容がわかるようにしたほうがいいよ。 男の人：わかりました。さっそく修正してみます。",
        audioScriptHtml: "<strong>男：</strong>部長、来週のクライアント向けの<ruby>提案書<rt>ていあんしょ</rt></ruby>、一応完成したんですが、目を通していただけますか。<br><strong>女：</strong>うん、データがよくまとまっているね。ただ、最初のページだけ少し文字が多すぎる気がするな。図やグラフを増やして、一目で内容がわかるようにしたほうがいいよ。<br><strong>男：</strong>わかりました。さっそく修正してみます。",
        options: [
          "最初のページに 図やグラフを 増やす",
          "データを すべて 作り直す",
          "ページ数を いまより 増やす",
          "このまま クライアントに 送る"
        ],
        answer: 0,
        explanation: "The manager says the first page has a bit too much text and advises adding diagrams and graphs so the content can be understood at a glance."
      },
      {
        id: "n3-l2",
        section: "listening",
        typeLabel: "Main Point",
        instruction: "Listen to the radio segment and choose the main topic.",
        prompt: "<ruby>話<rt>はな</rt></ruby>しているひとは 何について 話していますか。",
        audioText: "最近、使わなくなった服や家具をインターネット上で個人同士が売買するサービスが人気を集めています。単に安く買えるだけでなく、物を大切にしてゴミを減らすという環境への意識の高まりも、利用者が増えている大きな理由と言えそうです。",
        audioScriptHtml: "最近、使わなくなった服や家具をインターネット上で個人同士が売買するサービスが人気を集めています。単に安く買えるだけでなく、物を大切にしてゴミを減らすという環境への意識の高まりも、利用者が増えている大きな理由と言えそうです。",
        options: [
          "個人間で 中古品を 売買する サービスが 人気の 理由",
          "家具を インターネットで 無料で 修理する 方法",
          "服を 作る 工場での 環境対策",
          "ゴミの 分別ルールが 厳しくなった 背景"
        ],
        answer: 0,
        explanation: "The speaker discusses peer-to-peer online resale services for used clothes and furniture, noting both affordability and environmental awareness as reasons for their popularity."
      },
      {
        id: "n3-l3",
        section: "listening",
        typeLabel: "Inference",
        instruction: "Listen to the dialogue and choose what the man will do.",
        prompt: "<ruby>男<rt>おとこ</rt></ruby>のひとは 今週末 どうしますか。",
        audioText: "女の人：鈴木さん、今度の土曜日、みんなで行くハイキング、参加しますよね。 男の人：それが、楽しみにしてたんですが、急に大阪出張が入ってしまって……。日曜日の夕方には戻ってくるんですけど。 女の人：そうなんですか。残念ですね。また次の機会にぜひ。",
        audioScriptHtml: "<strong>女：</strong>鈴木さん、今度の土曜日、みんなで行くハイキング、参加しますよね。<br><strong>男：</strong>それが、楽しみにしてたんですが、急に大阪<ruby>出張<rt>しゅっちょう</rt></ruby>が入ってしまって……。日曜日の夕方には戻ってくるんですけど。<br><strong>女：</strong>そうなんですか。残念ですね。また次の機会にぜひ。",
        options: [
          "大阪へ 出張に行くため、ハイキングには 参加できない。",
          "出張を キャンセルして ハイキングに 行く。",
          "日曜日の 朝から ハイキングに 合流する。",
          "大阪の ハイキングに 参加する。"
        ],
        answer: 0,
        explanation: "Suzuki says an urgent business trip to Osaka came up and he won't return until Sunday evening, meaning he cannot join Saturday's hike."
      }
    ],

    /* ======================================================================
       JFT-Basic Exam (CEFR A2 — 16 Questions across 4 Official Domains)
       ====================================================================== */
    "JFT-A2": [
      // --- SCRIPT & VOCABULARY (4) ---
      {
        id: "jft-s1",
        section: "script",
        typeLabel: "Kanji Reading",
        instruction: "Choose the correct reading for the underlined kanji.",
        prompt: "スーパーの <u class=\"q-underline\">入口</u> で ともだちを 待ちます。",
        options: ["いりぐち", "でぐち", "いりくち", "はいるぐち"],
        answer: 0,
        explanation: "入口 is read いりぐち (iriguchi), meaning 'entrance'. 出口 (でぐち) is 'exit'."
      },
      {
        id: "jft-s2",
        section: "script",
        typeLabel: "Katakana & Daily Life",
        instruction: "Choose the word that best fits the blank.",
        prompt: "コンビニで おべんとうを 買いました。「<span class=\"q-blank\"></span> で あたためますか。」",
        options: ["電子レンジ", "エレベーター", "冷蔵庫", "洗濯機"],
        answer: 0,
        explanation: "電子レンジ (でんしレンジ) means 'microwave oven', which convenience stores use to warm up bento boxes."
      },
      {
        id: "jft-s3",
        section: "script",
        typeLabel: "Kanji Meaning",
        instruction: "Choose the correct meaning for the underlined workplace sign.",
        prompt: "ドアに「<u class=\"q-underline\">使用中</u>」と 書いてあります。",
        options: ["In use / Occupied", "Out of order", "No entry", "Exit only"],
        answer: 0,
        explanation: "使用中 (しようちゅう) means 'currently in use / occupied' (common on restrooms or meeting rooms)."
      },
      {
        id: "jft-s4",
        section: "script",
        typeLabel: "Daily Vocabulary",
        instruction: "Choose the word that best completes the sentence.",
        prompt: "きゅうに おなかが <span class=\"q-blank\"></span> なったので、きょうは 帰ります。",
        options: [
          "<ruby>痛<rt>いた</rt></ruby>く",
          "<ruby>寒<rt>さむ</rt></ruby>く",
          "<ruby>眠<rt>ねむ</rt></ruby>く",
          "<ruby>重<rt>おも</rt></ruby>く"
        ],
        answer: 0,
        explanation: "おなかが痛くなる means 'to get a stomachache'."
      },

      // --- CONVERSATION & EXPRESSION (4) ---
      {
        id: "jft-c1",
        section: "conversation",
        typeLabel: "Workplace Conversation",
        instruction: "Choose the best phrase to fill in the blank.",
        prompt: "<strong>A：</strong>「すみません、この <ruby>荷物<rt>にもつ</rt></ruby>、おもいですね。」<br><strong>B：</strong>「<span class=\"q-blank\"></span>」",
        options: [
          "じゃ、てつだいましょうか。",
          "はい、とても おいしいです。",
          "いいえ、きのう 買いました。",
          "こちらこそ、よろしくおねがいします。"
        ],
        answer: 0,
        explanation: "Offering help when someone says a bag is heavy: 'じゃ、てつだいましょうか' ('Well then, shall I help you?')."
      },
      {
        id: "jft-c2",
        section: "conversation",
        typeLabel: "Asking Permission",
        instruction: "You want to take a day off next Friday. What do you say to your manager?",
        prompt: "<strong>あなた：</strong>「あのう、<ruby>来週<rt>らいしゅう</rt></ruby>の 金よう日、お<ruby>休<rt>やす</rt></ruby>みを <span class=\"q-blank\"></span>。」",
        options: [
          "いただいても いいですか",
          "あげても いいですか",
          "しても いいですか",
          "おいて いいですか"
        ],
        answer: 0,
        explanation: "お休みをいただいてもいいですか ('May I take a day off?') is polite and natural in Japanese workplaces."
      },
      {
        id: "jft-c3",
        section: "conversation",
        typeLabel: "Shop Interaction",
        instruction: "Choose the natural reply at a train station ticket counter.",
        prompt: "<strong>駅員：</strong>「どちらまで 行きますか。」<br><strong>あなた：</strong>「<span class=\"q-blank\"></span>」",
        options: [
          "新宿まで おねがいします。",
          "電車で 30分 ぐらいです。",
          "あしたの 朝 8時です。",
          "片道 200円 払いました。"
        ],
        answer: 0,
        explanation: "The station staff asks 'Where are you going?' (どちらまで), so '新宿までおねがいします' ('To Shinjuku, please') is the right response."
      },
      {
        id: "jft-c4",
        section: "conversation",
        typeLabel: "Clarification",
        instruction: "You didn't understand what a coworker said. Choose the polite way to ask again.",
        prompt: "よく 聞こえませんでした。もう いちど <span class=\"q-blank\"></span>。",
        options: [
          "ゆっくり 言ってください",
          "たくさん 書いてください",
          "すぐに 帰ってください",
          "わすれないで ください"
        ],
        answer: 0,
        explanation: "'ゆっくり言ってください' ('Please speak slowly') is used when you couldn't catch what someone said."
      },

      // --- LISTENING COMPREHENSION (4) ---
      {
        id: "jft-l1",
        section: "listening",
        typeLabel: "Workplace Instruction",
        instruction: "Listen to the supervisor and choose where to put the boxes.",
        prompt: "<ruby>箱<rt>はこ</rt></ruby>は どこに 置きますか。",
        audioText: "上司：アリさん、その新しい箱ですが、まだ使わないので、ドアの横ではなくて、棚の一番下に置いてください。 アリ：わかりました。棚の一番下ですね。",
        audioScriptHtml: "<strong>上司：</strong>アリさん、その<ruby>新<rt>あたら</rt></ruby>しい<ruby>箱<rt>はこ</rt></ruby>ですが、まだ<ruby>使<rt>つか</rt></ruby>わないので、ドアの<ruby>横<rt>よこ</rt></ruby>ではなくて、<ruby>棚<rt>たな</rt></ruby>の<ruby>一番下<rt>いちばんした</rt></ruby>に<ruby>置<rt>お</rt></ruby>いてください。<br><strong>アリ：</strong>わかりました。<ruby>棚<rt>たな</rt></ruby>の<ruby>一番下<rt>いちばんした</rt></ruby>ですね。",
        options: [
          "<ruby>棚<rt>たな</rt></ruby>の 一番下",
          "ドアの よこ",
          "<ruby>棚<rt>たな</rt></ruby>の 一番上",
          "つくえの 上"
        ],
        answer: 0,
        explanation: "The supervisor says not beside the door, but on the bottom shelf (棚の一番下に置いてください)."
      },
      {
        id: "jft-l2",
        section: "listening",
        typeLabel: "Daily Announcement",
        instruction: "Listen to the store announcement and choose what is on sale today.",
        prompt: "きょう 安い ものは どれですか。",
        audioText: "店員：いらっしゃいませ。さくらスーパーからのお知らせです。本日は果物コーナーで、りんごが一袋二百円と大変お買い得です。ぜひご利用ください。",
        audioScriptHtml: "<strong>店員：</strong>いらっしゃいませ。さくらスーパーからのお知らせです。<ruby>本日<rt>ほんじつ</rt></ruby>は<ruby>果物<rt>くだもの</rt></ruby>コーナーで、りんごが<ruby>一袋<rt>ひとふくろ</rt></ruby>200<ruby>円<rt>えん</rt></ruby>と<ruby>大変<rt>たいへん</rt></ruby>お<ruby>買<rt>か</rt></ruby>い<ruby>得<rt>どく</rt></ruby>です。",
        options: ["りんご", "みかん", "パン", "ぎゅうにゅう"],
        answer: 0,
        explanation: "The announcement highlights that a bag of apples (りんご) is on special today for 200 yen."
      },
      {
        id: "jft-l3",
        section: "listening",
        typeLabel: "Clinic Reception",
        instruction: "Listen to the clinic dialogue and choose what the patient should do.",
        prompt: "<ruby>男<rt>おとこ</rt></ruby>のひとは これから どうしますか。",
        audioText: "受付：すみません、保険証をお預かりします。そのあと、この紙にお名前と住所を書いて、待合室でお待ちください。 男の人：はい、わかりました。",
        audioScriptHtml: "<strong>受付：</strong>すみません、<ruby>保険証<rt>ほけんしょう</rt></ruby>をお<ruby>預<rt>あず</rt></ruby>かりします。そのあと、この<ruby>紙<rt>かみ</rt></ruby>にお<ruby>名前<rt>なまえ</rt></ruby>と<ruby>住所<rt>じゅうしょ</rt></ruby>を<ruby>書<rt>か</rt></ruby>いて、<ruby>待合室<rt>まちあいしつ</rt></ruby>でお<ruby>待<rt>ま</rt></ruby>ちください。<br><strong>男：</strong>はい、わかりました。",
        options: [
          "紙に 名前と 住所を 書いて、待つ",
          "すぐ 薬局へ くすりを 取りに行く",
          "診察室に そのまま 入る",
          "あした また 予約をして 来る"
        ],
        answer: 0,
        explanation: "Reception asks for the insurance card, then tells him to write his name and address on the form and wait in the waiting room."
      },
      {
        id: "jft-l4",
        section: "listening",
        typeLabel: "Schedule Change",
        instruction: "Listen to the phone call and choose when they will meet.",
        prompt: "ふたりは いつ 会いますか。",
        audioText: "女の人：もしもし、マリアです。あしたの夕方5時に駅で会う予定でしたが、仕事がおそくなりそうなので、6時にしてもいいですか。 男の人：いいですよ。じゃ、6時に改札の前で待っています。",
        audioScriptHtml: "<strong>女：</strong>もしもし、マリアです。あしたの<ruby>夕方<rt>ゆうがた</rt></ruby>5<ruby>時<rt>じ</rt></ruby>に<ruby>駅<rt>えき</rt></ruby>で<ruby>会<rt>あ</rt></ruby>う<ruby>予定<rt>よてい</rt></ruby>でしたが、<ruby>仕事<rt>しごと</rt></ruby>がおそくなりそうなので、6<ruby>時<rt>じ</rt></ruby>にしてもいいですか。<br><strong>男：</strong>いいですよ。じゃ、6<ruby>時<rt>じ</rt></ruby>に<ruby>改札<rt>かいさつ</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>で<ruby>待<rt>ま</rt></ruby>っています。",
        options: ["あしたの 6時", "あしたの 5時", "きょうの 6時", "あさっての 5時"],
        answer: 0,
        explanation: "They changed tomorrow's meeting time from 5:00 to 6:00 (6時に改札の前で待っています)."
      },

      // --- READING COMPREHENSION (4) ---
      {
        id: "jft-r1",
        section: "reading",
        typeLabel: "Public Sign",
        passageTitle: "公園の お願い",
        passage: "・ゴミは かならず もちかえって ください。<br>・よる 9時からは 大きな 声で はなさないで ください。<br>・自転車は 入り口の となりに とめて ください。",
        instruction: "Read the park sign and choose the rule that is true.",
        prompt: "この 公園の ルールは どれですか。",
        options: [
          "自転車は 入り口の となりに とめます。",
          "ゴミは 公園の ごみ箱に すてます。",
          "よる 9時までは 自転車に のって いいです。",
          "よる 10時に 大きな 声で はなしても いいです。"
        ],
        answer: 0,
        explanation: "The sign instructs visitors to park bicycles next to the entrance (自転車は 入り口の となりに とめて ください)."
      },
      {
        id: "jft-r2",
        section: "reading",
        typeLabel: "Food Label",
        passageTitle: "おにぎりの ラベル",
        passage: "商品名：さけ おにぎり<br>消費期限：2026年 11月 26日 ごご 3時<br>保存方法：10℃以下で 保存してください。<br>※ あたためる ときは、ふくろを すこし あけて ください。",
        instruction: "Read the food label and answer the question.",
        prompt: "この おにぎりを 電子レンジで あたためるとき、どうしますか。",
        options: [
          "ふくろを すこし あけてから あたためます。",
          "ふくろから 出して 水を かけます。",
          "10℃以下の へやで あたためます。",
          "11月26日の よるまで あたためては いけません。"
        ],
        answer: 0,
        explanation: "The note at the bottom says: 'When warming, please open the bag slightly' (ふくろを すこし あけて ください)."
      },
      {
        id: "jft-r3",
        section: "reading",
        typeLabel: "Workplace Chat",
        passageTitle: "きゅうけい室のお知らせ",
        passage: "社員のみなさんへ<br>今週の 金よう日、午後 1時から 3時まで、きゅうけい室の れいぞうこを そうじします。<br>木よう日の 帰りまでに、自分の 飲み物や おべんとうを 持って帰ってください。<br>残っている ものは すてます。",
        instruction: "Read the message and answer the question.",
        prompt: "社員は 木よう日の 帰りまでに 何を しなければなりませんか。",
        options: [
          "れいぞうこから 自分の ものを 持って帰ります。",
          "金よう日の 午後に れいぞうこを そうじします。",
          "あたらしい 飲み物を れいぞうこに 入れます。",
          "きゅうけい室の ごみを ぜんぶ すてます。"
        ],
        answer: 0,
        explanation: "Staff must take home their own drinks and bentos from the fridge before leaving on Thursday, or leftover items will be discarded."
      },
      {
        id: "jft-r4",
        section: "reading",
        typeLabel: "Short Message",
        passageTitle: "けんたさんからの メッセージ",
        passage: "ナディさん、きょうは いっしょに サッカーをして たのしかったですね。<br>らいしゅうの 日よう日も 同じ グラウンドで します。<br>でも、あさ 10時ではなくて、9時半から はじめます。<br>水と タオルを わすれずに 持ってきて ください。",
        instruction: "Read the message and answer the question.",
        prompt: "らいしゅうの 日よう日、サッカーは 何時に はじまりますか。",
        options: ["あさ 9時30分", "あさ 10時00分", "ごご 1時00分", "あさ 9時00分"],
        answer: 0,
        explanation: "Kenta writes that next Sunday they will start at 9:30 instead of 10:00 (9時半から はじめます)."
      }
    ]
  }
};
