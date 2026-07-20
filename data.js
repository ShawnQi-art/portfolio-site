const categoryDefinitions = [
  {
    "key": "art-books",
    "label": "Artist Books",
    "pageTitle": "Artist Books",
    "pageUrl": "category-art-books.html",
    "placeholderColor": "#e8b4a2"
  },
  {
    "key": "paintings",
    "label": "Paintings",
    "pageTitle": "Paintings",
    "pageUrl": "category-paintings.html",
    "placeholderColor": "#b74432"
  },
  {
    "key": "graphic-works",
    "label": "Graphic Works",
    "pageTitle": "Graphic Works",
    "pageUrl": "category-graphic-works.html",
    "placeholderColor": "#f2d16b"
  },
  {
    "key": "sculpture",
    "label": "Sculptural Works",
    "pageTitle": "Sculptural Works",
    "pageUrl": "category-sculpture.html",
    "placeholderColor": "#8e7dbe"
  }
];

const makePlaceholderImage = (title, color, imageNumber) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200">
      <rect width="900" height="1200" fill="${color}"/>
      <rect x="52" y="52" width="796" height="1096" fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="4"/>
      <text x="72" y="130" fill="#000000" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="700">${title}</text>
      <text x="72" y="218" fill="#000000" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="400">Image ${imageNumber}</text>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const findCategory = (categoryKey) =>
  categoryDefinitions.find((category) => category.key === categoryKey);

const withImageFallbacks = (work) => {
  const category = findCategory(work.category);
  const fallbackImages = Array.from({ length: 7 }, (_, index) =>
    makePlaceholderImage(work.title, category.placeholderColor, index + 1)
  );
  const images = work.images.length ? work.images : fallbackImages;

  const hasDescription = Object.prototype.hasOwnProperty.call(work, "description");

  return {
    ...work,
    categoryLabel: work.categoryLabel || category.label,
    cover: work.cover || images[0],
    images,
    medium: work.medium || "Medium TBD",
    description: hasDescription ? work.description : "Add a description for this work."
  };
};

const works = [
  {
    "id": "art-books-2024-01",
    "title": "The Tortoise and the Hare",
    "category": "art-books",
    "categoryLabel": "Artist Books",
    "year": "2024",
    "cover": "assets/艺术书籍/2024/龟兔赛跑/cover.jpg",
    "images": [
      "assets/艺术书籍/2024/龟兔赛跑/cover.jpg",
      "assets/艺术书籍/2024/龟兔赛跑/龟兔赛跑1.jpg",
      "assets/艺术书籍/2024/龟兔赛跑/龟兔赛跑2.jpg",
      "assets/艺术书籍/2024/龟兔赛跑/龟兔赛跑3.jpg",
      "assets/艺术书籍/2024/龟兔赛跑/龟兔赛跑4.jpg",
      "assets/艺术书籍/2024/龟兔赛跑/龟兔赛跑5.jpg",
      "assets/艺术书籍/2024/龟兔赛跑/龟兔赛跑6.jpg",
      "assets/艺术书籍/2024/龟兔赛跑/龟兔赛跑7.jpg",
      "assets/艺术书籍/2024/龟兔赛跑/龟兔赛跑8.jpg",
      "assets/艺术书籍/2024/龟兔赛跑/龟兔赛跑9.jpg"
    ],
    "description": `The Tortoise and the Hare is a wordless picture book experiment that takes Aesop’s fable as its textual starting point.

Originating in ancient Greece, Aesop’s fable The Tortoise and the Hare has been circulated, translated, rewritten, and used in education for nearly three thousand years. It has become one of the most widely recognized stories in children’s literature. The fable is often understood as a moral tale about “diligence overcoming laziness,” “patience defeating arrogance,” or “persistence eventually leading to victory.” Yet throughout its long history of retelling, the story has also been given new interpretations again and again: Does the tortoise win because of effort, or because of the contingency of rules? Is the hare’s failure a punishment for arrogance, or a temporary departure from the logic of competition? As the story is repeatedly retold, its seemingly stable moral begins to reveal an internal uncertainty.

My wordless picture book The Tortoise and the Hare begins precisely from this uncertainty. Rather than retelling a children’s story about winning and losing, I wanted to dismantle the structure that has been taken for granted within the original fable: Who is the protagonist, and who is the opponent? What constitutes a race? What defines victory? Must the characters in a fable represent fixed moral qualities? Must the reader accept a one-way moral conclusion? These questions became the starting point of this work.

In this book, I introduce “deconstruction” as the core creative method within the narrative of a picture book. By removing written explanation, the work weakens the original causal logic and educational purpose of the story, allowing the relationships between the hare, the tortoise, the track, direction, the finish line, and the viewer to be reorganized. Pauses, displacements, blank spaces, and structural shifts within the images gradually loosen the stable character relationships of the traditional fable. The hare and the tortoise are no longer merely opposing symbols of “fast and slow” or “arrogance and diligence,” but become two presences that can be seen and understood anew.

The structure of the book itself also becomes part of the narrative. The circular opening on the cover, the red thread running through the book, the expandable spatial construction, and the transformation between image and object all turn reading into more than the act of turning pages. Reading becomes a process of looking, entering, and recomposing the story. When closed, the cover forms a complete image; when opened, it reveals a new spatial relationship. This “openness after closure” responds to the central idea of the work: a classic is not a closed conclusion, but a structure that can be entered again and again.

Therefore, The Tortoise and the Hare is not an illustrated retelling of the original fable, but a visual study of classic stories, children’s narrative, and the mechanisms through which meaning is produced. It attempts to release the fable from fixed moral judgment and return the story to an open field of reading. The reader is no longer simply receiving the conclusion delivered by the fable, but is invited to rethink rules, opposition, failure, victory, and the possibilities of the story itself through images and book structure.

For me, what this work truly concerns is not “who wins the race,” but what else we might see when a repeatedly told classic story is taken apart and looked at again.`,
    "medium": "Wordless Book"
  },
  {
    "id": "art-books-2022-02",
    "title": "I Hear",
    "category": "art-books",
    "categoryLabel": "Artist Books",
    "year": "2022",
    "cover": "assets/艺术书籍/2022/我听见/我听见1.jpg",
    "images": [
      "assets/艺术书籍/2022/我听见/我听见1.jpg",
      "assets/艺术书籍/2022/我听见/我听见3.jpg",
      "assets/艺术书籍/2022/我听见/我听见4.jpg",
      "assets/艺术书籍/2022/我听见/我听见5.jpg",
      "assets/艺术书籍/2022/我听见/我听见6.jpg",
      "assets/艺术书籍/2022/我听见/我听见7.jpg",
      "assets/艺术书籍/2022/我听见/我听见8.jpg",
      "assets/艺术书籍/2022/我听见/我听见9.jpg",
      "assets/艺术书籍/2022/我听见/我听见10.jpg",
      "assets/艺术书籍/2022/我听见/我听见11.jpg",
      "assets/艺术书籍/2022/我听见/我听见12.jpg",
      "assets/艺术书籍/2022/我听见/我听见13.jpg",
      "assets/艺术书籍/2022/我听见/我听见14.jpg",
      "assets/艺术书籍/2022/我听见/我听见15.jpg",
      "assets/艺术书籍/2022/我听见/我听见16.jpg",
      "assets/艺术书籍/2022/我听见/我听见17.jpg"
    ],
    "description": `I Hear is a wordless picture book about “hearing” and “existence.”

In Chinese, the character “声” in “声音” — sound — and the character “生” in “生命” — life — share the same pronunciation. This accidental linguistic connection became the original starting point of this work. I began to ask myself: Is sound merely information coming from the outside world? Or does it also continuously shape our emotions, memories, relationships, and sense of self? We understand the world through sound, and we also confirm our own existence within it.

I later titled this work I Hear. Rather than approaching “sound” as an abstract concept, I wanted the title to return to a specific subject: someone who is listening, feeling, and being affected by the world. “I hear” is not only an action, but also a way of perceiving the world — a state of recognizing one’s own existence within a complex field of sounds.

In this work, I transform sound into a visible visual experience. At times, it expands like a shadow; at times, it repeats like a pattern. It may become spatial pressure, collective noise, social discipline, or a psychological weight that is difficult to put into words. Rather than depicting sound itself, I wanted to depict what happens after sound enters a person — the reactions it leaves in the body and in the mind.

The book unfolds through a series of left-right spreads. The left page usually presents an external situation: conflict, discipline, applause, danger, temptation, loneliness, or sounds from nature and the city. The right page turns back toward the individual, portraying the state of the characters as they face these sounds. They close their eyes, cover their ears, remain silent, smile, or simply stay quietly at the center of the image. These gestures are not merely a rejection of the outside world, but a brief pause — a way of re-confirming one’s own feelings.

I chose the form of a wordless picture book because I wanted the narrative to rely not on written explanation, but on the juxtaposition, repetition, and variation between images, allowing readers to enter the work through their own perception. Black, white, and gray form the main visual language of the book, while small areas of color appear like preserved signals of life, suggesting that within an immense world of sound, the individual still holds subtle but genuine feelings.

I Hear is not simply a story about escaping noise. For me, it is closer to a question: When the world constantly speaks to us, when the emotions, judgments, expectations, and desires of others continue to enter our lives, can we still hear ourselves? Can we find a way to live with the world between hearing and not hearing?

What I wanted to portray is precisely this state: sound constructs the world, and it also shapes people. Within the sounds of the world, each person searches for an inner echo of their own.`,
    "medium": "Wordless Book"
  },
  {
    "id": "art-books-2020-03",
    "title": "Shadow",
    "category": "art-books",
    "categoryLabel": "Artist Books",
    "year": "2020",
    "cover": "assets/艺术书籍/2020/影/cover.jpg",
    "images": [
      "assets/艺术书籍/2020/影/cover.jpg",
      "assets/艺术书籍/2020/影/1.jpg",
      "assets/艺术书籍/2020/影/2.jpg",
      "assets/艺术书籍/2020/影/3.jpg",
      "assets/艺术书籍/2020/影/5.jpg",
      "assets/艺术书籍/2020/影/6.jpg",
      "assets/艺术书籍/2020/影/7.jpg"
    ],
    "description": `Shadow is a wordless picture book about self-cognition.

A shadow is one of the most familiar presences in our lives, yet also one of the easiest to overlook. It follows us closely — sometimes obedient, sometimes stubborn; sometimes quietly attached to the body, sometimes enlarged infinitely under the light. It is like a black mirror, revealing another part of ourselves that we may not wish to face, but that has always existed.

In this work, I use the “shadow” as a symbolic vocabulary to express the confusion, avoidance, confrontation, and breakthrough that occur in the process of self-cognition. The story takes place in an absurd and empty white space. The protagonist is the only living being in this world, and also the only one who has a shadow. At first, he does not notice its existence. Later, he begins to observe it, doubt it, fear it, and eventually tries to escape from it — even to eliminate it. Yet the shadow never truly disappears. It remains as another side of the self, coexisting with him.

The relationship between the person and the shadow comes from my reflection on the opposing structures within the personality. A human being is not a single, transparent, or stable existence. Within us, there is an idealized self, but also instincts, desires, fears, and obscure inner darkness that cannot be easily put into words. In Shadow, the protagonist and his shadow symbolize this relationship of conflict and inseparability: when a person tries to get rid of the shadow, he is in fact trying to get rid of a part of himself.

I chose the form of a wordless book because I wanted to reduce verbal explanation and allow readers to enter the story through images, rhythm, and silence. The minimal black-and-white images, the constantly changing shadow, and the relationship between the figure and the surrounding space together form a visual narrative about self-cognition. As readers turn the pages, they are not only witnessing the struggle between the protagonist and his shadow, but also re-examining their own relationship with their inner shadow.

For me, Shadow is not a story about defeating darkness, but about understanding it anew. The shadow is not an enemy, nor is it a flaw. It is an inseparable part of the self. True breakthrough does not come from completely eliminating the shadow, but from seeing it again, understanding it, and ultimately learning to coexist with it.`,
    "medium": "Wordless Book"
  },
  {
    "id": "art-books-2019-04",
    "title": "Healing",
    "category": "art-books",
    "categoryLabel": "Artist Books",
    "year": "2019",
    "cover": "assets/艺术书籍/2019/弥合/cover.jpeg",
    "images": [
      "assets/艺术书籍/2019/弥合/cover.jpeg",
      "assets/艺术书籍/2019/弥合/1.jpeg",
      "assets/艺术书籍/2019/弥合/2.jpeg",
      "assets/艺术书籍/2019/弥合/3.jpeg",
      "assets/艺术书籍/2019/弥合/4.jpeg",
      "assets/艺术书籍/2019/弥合/5.jpeg",
      "assets/艺术书籍/2019/弥合/6.jpeg",
      "assets/艺术书籍/2019/弥合/7.jpeg",
      "assets/艺术书籍/2019/弥合/8.jpeg",
      "assets/艺术书籍/2019/弥合/9.jpeg"
    ],
    "description": `Healing is a wordless picture book that begins with a poem.

The work takes its starting point from a line by the Chinese poet Gu Cheng: “Where reality breaks apart, dreams gather into a sea.” This sentence contains several images at once: rupture, dreams, reality, and the sea. It also suggests the possibility of moving from fragmentation toward connection. Taking this line as an entry point, I created the wordless picture book Healing, drawing on recurring images in Gu Cheng’s poetry, such as nature, childhood, dreams, solitude, and the inner world.

In this work, I did not intend to translate the poem into a clear narrative. Instead, I wanted to transform the vague, shifting, and ungraspable sensations of the poem into a visual experience. The green substance in the images resembles dreams, water, plants, and a kind of life force seeping out from the cracks of reality. The gray spaces, by contrast, form a calm, silent, almost ruin-like field of reality. As these two elements encounter, flow, and spread across the pages, they create a visual narrative suspended between reality and dream.

To respond to the symbolism, ambiguity, and multiplicity of meaning found in Misty Poetry, I designed a special page structure for this book: it can be unfolded both to the left and to the right, without a fixed reading order. The reader no longer follows a single linear path, but actively participates in the formation of meaning through turning, unfolding, returning, and recombining the pages. Each change in reading order may lead to a different association and interpretation.

Therefore, Healing is not an illustrative retelling of a poem, but an experiment in how poetry can become a book. Through the form of a wordless picture book, I wanted images, paper structure, and the act of reading to participate in the narrative together. In this way, the ambiguity of the poem is not dissolved by explanation, but preserved and extended through visual and spatial experience.

For me, “healing” does not mean completely filling every crack. It is more like a process of rebuilding relationships within rupture: between reality and dream, order and chaos, the visible and the invisible, poetry and image. In the unfolding of the book, these elements meet briefly on the page. The parts that cannot be fully explained by language are precisely the spaces I wanted this work to preserve.`,
    "medium": "Wordless Book"
  },
  {
    "id": "art-books-2019-05",
    "title": "Yanjiao Political Propaganda Slogans",
    "category": "art-books",
    "categoryLabel": "Artist Books",
    "year": "2019",
    "cover": "assets/艺术书籍/2019/燕郊政治宣传标语/cover.jpg",
    "images": [
      "assets/艺术书籍/2019/燕郊政治宣传标语/cover.jpg",
      "assets/艺术书籍/2019/燕郊政治宣传标语/1.jpeg",
      "assets/艺术书籍/2019/燕郊政治宣传标语/2.jpg",
      "assets/艺术书籍/2019/燕郊政治宣传标语/3.jpg"
    ],
    "description": `Political Propaganda Slogans in Yanjiao is a book project based on photographic documentation and typographic analysis.

The work collects a large number of political propaganda slogans that I photographed on the streets of Yanjiao Economic Development Zone in Hebei Province, China. Located at the border between Beijing and Hebei, Yanjiao is a residential area for many people who commute to Beijing for work. In this urban environment, political slogans frequently appear along roadsides, construction fences, building facades, community entrances, and public facilities. They form a street-level visual landscape that is constantly visible in daily life, yet often overlooked.

In this work, I first documented these slogans through photography, preserving their actual conditions within specific street environments. I then extracted selected slogans from the photographs and analyzed their typography, typefaces, font sizes, color usage, image-text relationships, and visual hierarchy. Design features such as red backgrounds with yellow characters, bold typefaces, centered layouts, large-scale slogans, and strong color contrasts appear repeatedly, forming a highly recognizable public visual language.

The latter part of the book includes political graphic works from other regions and countries as references for comparison. Through these comparisons, I wanted to place the street slogans of Yanjiao within a broader context of political visual culture, rather than viewing them merely as local street information. Although political images from different regions vary in ideology, medium, and visual style, they all involve the relationship between text, color, layout, and public space.

This book does not attempt to offer a clear political conclusion, nor does it directly criticize or endorse these slogans. It functions more as a visual archive and design observation. Through photography, collection, classification, and layout analysis, the work re-presents public images that are usually absorbed into the background of everyday life.

I hope that, when reading this book, viewers can step away from habitual ways of seeing and begin to notice street slogans as a graphic design phenomenon: how they are produced, how they occupy space, how they construct visual authority through type, color, and layout, and how they become a stable and repetitive background within urban life.`,
    "medium": "Photographic Documentation"
  },
  {
      "id": "paintings-2025-01",
      "title": "Tilted Vase",
      "zhTitle": "倾斜的花瓶",
      "category": "paintings",
      "categoryLabel": "Paintings",
      "year": "2024",
      "cover": "assets/绘画/2025/倾斜的花瓶.jpg",
      "images": [
          "assets/绘画/2025/倾斜的花瓶.jpg"
      ],
      "medium": "Acrylic",
      "zhMedium": "丙烯",
      "description": ""
  },
  {
      "id": "paintings-2025-02",
      "title": "Leg Creature",
      "zhTitle": "腿怪",
      "category": "paintings",
      "categoryLabel": "Paintings",
      "year": "2024",
      "cover": "assets/绘画/2025/腿怪1.jpg",
      "images": [
          "assets/绘画/2025/腿怪1.jpg",
          "assets/绘画/2025/腿怪2.jpg"
      ],
      "medium": "Acrylic",
      "zhMedium": "丙烯",
      "description": ""
  },
  {
      "id": "paintings-2022-03",
      "title": "Studies in Point, Line, and Plane",
      "zhTitle": "点线面的练习",
      "category": "paintings",
      "categoryLabel": "Paintings",
      "year": "2022",
      "cover": "assets/绘画/2022/点线面的练习4.jpg",
      "images": [
          "assets/绘画/2022/点线面的练习1.jpg",
          "assets/绘画/2022/点线面的练习4.jpg",
          "assets/绘画/2022/点线面的练习5.jpg",
          "assets/绘画/2022/点线面的练习6.jpg",
          "assets/绘画/2022/点线面的练习7.jpg",
          "assets/绘画/2022/点线面的练习8.jpg",
          "assets/绘画/2022/点线面的练习9.jpg"
      ],
      "medium": "Digital",
      "zhMedium": "数字",
      "description": ""
  },
  {
      "id": "paintings-2019-06",
      "title": "Healing",
      "zhTitle": "弥合",
      "category": "paintings",
      "categoryLabel": "Paintings",
      "year": "2019",
      "cover": "assets/绘画/2019/弥合/1.JPG",
      "images": [
          "assets/绘画/2019/弥合/1.JPG",
          "assets/绘画/2019/弥合/2.JPG",
          "assets/绘画/2019/弥合/3.JPG",
          "assets/绘画/2019/弥合/4.JPG",
          "assets/绘画/2019/弥合/5.JPG",
          "assets/绘画/2019/弥合/6.JPG",
          "assets/绘画/2019/弥合/7.JPG",
          "assets/绘画/2019/弥合/8.JPG",
          "assets/绘画/2019/弥合/9.JPG",
          "assets/绘画/2019/弥合/10.JPG",
          "assets/绘画/2019/弥合/11.JPG",
          "assets/绘画/2019/弥合/12.JPG",
          "assets/绘画/2019/弥合/13.JPG",
          "assets/绘画/2019/弥合/14.JPG",
          "assets/绘画/2019/弥合/15.JPG",
          "assets/绘画/2019/弥合/16.JPG"
      ],
      "medium": "Painting Series",
      "zhMedium": "系列绘画",
      "description": ""
  },
  {
      "id": "paintings-2019-04",
      "title": "Untitled",
      "zhTitle": "无题",
      "category": "paintings",
      "categoryLabel": "Paintings",
      "year": "2019",
      "cover": "assets/绘画/2019/无题2.jpeg",
      "images": [
          "assets/绘画/2019/无题2.jpeg"
      ],
      "medium": "Technical Pen, Colored Pencil",
      "zhMedium": "针管笔、彩色铅笔",
      "description": ""
  },
  {
      "id": "paintings-2017-05",
      "title": "Color Studies for Before Dawn",
      "zhTitle": "《天亮之前》彩色练习",
      "category": "paintings",
      "categoryLabel": "Paintings",
      "year": "2017",
      "cover": "assets/绘画/2017/《天亮之前》彩色练习1.jpg",
      "images": [
          "assets/绘画/2017/《天亮之前》彩色练习1.jpg",
          "assets/绘画/2017/《天亮之前》彩色练习2.jpg"
      ],
      "medium": "Technical Pen, Digital",
      "zhMedium": "针管笔、数字",
      "description": ""
  },
  {
      "id": "graphic-works-commercial-02",
      "title": "Domestic Art 008",
      "zhTitle": "国产艺术凌凌捌",
      "category": "graphic-works",
      "categoryLabel": "Graphic Works",
      "year": "2024",
      "cover": "assets/平面作品/商业设计/国产艺术凌凌捌-商业海报/cover.jpg",
      "images": [
          "assets/平面作品/商业设计/国产艺术凌凌捌-商业海报/cover.jpg",
          "assets/平面作品/商业设计/国产艺术凌凌捌-商业海报/detail-1.jpg",
          "assets/平面作品/商业设计/国产艺术凌凌捌-商业海报/detail-2.jpg",
          "assets/平面作品/商业设计/国产艺术凌凌捌-商业海报/detail-3.jpg",
          "assets/平面作品/商业设计/国产艺术凌凌捌-商业海报/detail-4.jpg",
          "assets/平面作品/商业设计/国产艺术凌凌捌-商业海报/detail-5.jpg",
          "assets/平面作品/商业设计/国产艺术凌凌捌-商业海报/detail-6.jpg",
          "assets/平面作品/商业设计/国产艺术凌凌捌-商业海报/detail-7.jpg",
          "assets/平面作品/商业设计/国产艺术凌凌捌-商业海报/detail-8.jpg"
      ],
      "medium": "Commercial Poster",
      "zhMedium": "商业海报",
      "badge": "Commercial Design",
      "zhBadge": "商业设计",
      "description": ""
  },
  {
      "id": "graphic-works-2024-01",
      "title": "University of Applied Arts Vienna Festival Poster",
      "zhTitle": "维也纳应用艺术大学艺术节海报",
      "category": "graphic-works",
      "categoryLabel": "Academic Project",
      "year": "2024",
      "cover": "assets/平面作品/2024/维也纳应用艺术大学艺术节海报/1.png",
      "images": [
          "assets/平面作品/2024/维也纳应用艺术大学艺术节海报/1.png",
          "assets/平面作品/2024/维也纳应用艺术大学艺术节海报/2.png",
          "assets/平面作品/2024/维也纳应用艺术大学艺术节海报/展示实拍.jpg",
          "assets/平面作品/2024/维也纳应用艺术大学艺术节海报/维也纳应用艺术大学艺术节海报动态版.mp4"
      ],
      "medium": "Academic Project",
      "zhMedium": "学术项目",
      "description": ""
  },
  {
      "id": "graphic-works-commercial-01",
      "title": "HER",
      "zhTitle": "HER",
      "category": "graphic-works",
      "categoryLabel": "Graphic Works",
      "year": "2024",
      "cover": "assets/平面作品/商业设计/HER-商业海报/cover.jpg",
      "images": [
          "assets/平面作品/商业设计/HER-商业海报/cover.jpg"
      ],
      "medium": "Commercial Poster",
      "zhMedium": "商业海报",
      "badge": "Commercial Design",
      "zhBadge": "商业设计",
      "description": ""
  },
  {
      "id": "graphic-works-commercial-03",
      "title": "In Memory of the Days We Were Hammered Together",
      "zhTitle": "纪念一起被“锤”的岁月",
      "category": "graphic-works",
      "categoryLabel": "Graphic Works",
      "year": "2024",
      "cover": "assets/平面作品/商业设计/纪念一起被“锤”的岁月-商业海报/9972CC3E-4694-4258-A293-2C92A1A5E5D8_1_105_c.jpeg",
      "images": [
          "assets/平面作品/商业设计/纪念一起被“锤”的岁月-商业海报/9972CC3E-4694-4258-A293-2C92A1A5E5D8_1_105_c.jpeg"
      ],
      "medium": "Commercial Poster",
      "zhMedium": "商业海报",
      "badge": "Commercial Design",
      "zhBadge": "商业设计",
      "description": ""
  },
  {
      "id": "graphic-works-2022-02",
      "title": "Becoming Pixels",
      "zhTitle": "成为像素",
      "category": "graphic-works",
      "categoryLabel": "Graphic Works",
      "year": "2022",
      "cover": "assets/平面作品/2022/看手机的“人”.gif",
      "images": [
          "assets/平面作品/2022/看手机的“人”.gif"
      ],
      "medium": "Digital Media",
      "zhMedium": "数字媒体",
      "description": ""
  },  {
      "id": "graphic-works-2024-09",
      "title": "What Should I Do",
      "zhTitle": "要我怎么办",
      "category": "graphic-works",
      "categoryLabel": "Graphic Works",
      "year": "2022",
      "cover": "assets/平面作品/要我怎么办，个人海报.JPG",
      "images": [
          "assets/平面作品/要我怎么办，个人海报.JPG"
      ],
      "medium": "Personal Poster",
      "zhMedium": "个人海报",
      "description": ""
  },
  {
      "id": "graphic-works-2024-10",
      "title": "Self-Redemption",
      "zhTitle": "自我救赎",
      "category": "graphic-works",
      "categoryLabel": "Graphic Works",
      "year": "2022",
      "cover": "assets/平面作品/自我救赎，个人海报.JPG",
      "images": [
          "assets/平面作品/自我救赎，个人海报.JPG"
      ],
      "medium": "Personal Poster",
      "zhMedium": "个人海报",
      "description": ""
  },
  {
      "id": "graphic-works-2024-04",
      "title": "Forbidden City Summer Set",
      "zhTitle": "故宫夏日套装",
      "category": "graphic-works",
      "categoryLabel": "Graphic Works",
      "year": "2019",
      "cover": "assets/平面作品/故宫夏日套装/1.JPG",
      "images": [
          "assets/平面作品/故宫夏日套装/1.JPG",
          "assets/平面作品/故宫夏日套装/2.JPG",
          "assets/平面作品/故宫夏日套装/3.JPG",
          "assets/平面作品/故宫夏日套装/4.JPG"
      ],
      "medium": "Cultural Product Design",
      "zhMedium": "文创产品设计",
      "description": ""
  },
  {
      "id": "graphic-works-2024-11",
      "title": "No. 7 Jam Shop",
      "zhTitle": "七号果酱铺",
      "category": "graphic-works",
      "categoryLabel": "Graphic Works",
      "year": "2019",
      "cover": "assets/平面作品/七号果酱铺，活动海报.JPG",
      "images": [
          "assets/平面作品/七号果酱铺，活动海报.JPG"
      ],
      "medium": "Event Poster",
      "zhMedium": "活动海报",
      "description": ""
  },
  {
      "id": "graphic-works-2019-03",
      "title": "Sky Lake",
      "zhTitle": "天空湖",
      "category": "graphic-works",
      "categoryLabel": "Graphic Works",
      "year": "2019",
      "cover": "assets/平面作品/2019/5.jpeg",
      "images": [
          "assets/平面作品/2019/5.jpeg",
          "assets/平面作品/2019/6.jpeg",
          "assets/平面作品/2019/7.jpeg",
          "assets/平面作品/2019/8.jpeg",
          "assets/平面作品/2019/9.jpeg"
      ],
      "medium": "Photography / Digital Production",
      "zhMedium": "摄影/数字制作",
      "description": ""
  },
  {
      "id": "graphic-works-2024-05",
      "title": "Nostril",
      "zhTitle": "鼻孔",
      "category": "graphic-works",
      "categoryLabel": "Graphic Works",
      "year": "2018",
      "cover": "assets/平面作品/鼻孔，书籍封面.jpg",
      "images": [
          "assets/平面作品/鼻孔，书籍封面.jpg"
      ],
      "medium": "Book Cover",
      "zhMedium": "书籍封面",
      "description": ""
  },
  {
      "id": "sculpture-2024-01",
      "title": "The Love Knot",
      "zhTitle": "同心结",
      "category": "sculpture",
      "categoryLabel": "Sculptural Works",
      "year": "2024",
      "cover": "assets/立体作品/2024/纸雕塑-同心结/cover.jpg",
      "images": [
          "assets/立体作品/2024/纸雕塑-同心结/cover.jpg",
          "assets/立体作品/2024/纸雕塑-同心结/1.jpg",
          "assets/立体作品/2024/纸雕塑-同心结/2.jpg",
          "assets/立体作品/2024/纸雕塑-同心结/3.jpg"
      ],
      "medium": "Paper Sculpture",
      "zhMedium": "纸雕塑",
      "description": "The Love Knot is a sculptural work inspired by the traditional Chinese Tongxin Jie, or “love knot.”\n\nIn Chinese culture, the Tongxin Jie is a traditional knot ornament that symbolizes love, union, and lasting companionship. It is not merely a decorative pattern, but a structural image formed through lines, knots, interweaving, and connection. What interests me is the relationship implied by this structure: two independent parts approach each other, cross, pull, and eventually form a new whole.\n\nThe basic material of this work is white paper plates. Originally, paper plates are ordinary, lightweight, and disposable objects. After being repeatedly connected in large quantities, they gradually form two large rope-like structures. These two paper structures then cross, intertwine, and gather in space, eventually forming a giant knot. The contrast between the lightness of the material and the volume of the final structure gives the work a state between fragility and solidity.\n\nI kept the original white color of the paper plates in order to reduce decorative distraction and direct attention to the structure, rhythm, and material itself. The repeated paper-plate units create a visual effect reminiscent of scales, bones, or growing tissue, making the knot appear both light and dense, both soft and tense. It is not a smooth, complete, or overly symbolized image of love, but a spatial structure supported by many small connections.\n\nFor me, The Love Knot is not simply a direct expression of “love,” but a material translation of traditional knot language. Through the ordinary material of paper plates, I wanted to reconsider the structural relationships within the Tongxin Jie — connection, interweaving, and companionship — and transform them into a form that can be seen, approached, and re-perceived through scale, weight, repeated labor, and spatial relationships.\n\nThe work was presented in EIN HAUFEN LIEBE / A PILE OF LOVE: Experiments in Sculptural Design, a group exhibition by the Klasse für Grafik Design at the University of Applied Arts Vienna. The exhibition took place at Schloss Neugebäude, Vienna, from 17 to 28 January 2024."
  }
].map(withImageFallbacks);

const supportedLanguages = ["en", "zh"];
const defaultLanguage = "en";
const languageStorageKey = "portfolio-language";

const getStoredLanguage = () => {
  try {
    return localStorage.getItem(languageStorageKey) || defaultLanguage;
  } catch (error) {
    return defaultLanguage;
  }
};

const getCurrentLanguage = () => {
  const storedLanguage = getStoredLanguage();
  return supportedLanguages.includes(storedLanguage) ? storedLanguage : defaultLanguage;
};

const setCurrentLanguage = (language) => {
  const nextLanguage = supportedLanguages.includes(language) ? language : defaultLanguage;
  try {
    localStorage.setItem(languageStorageKey, nextLanguage);
  } catch (error) {
    // The site still works if storage is unavailable.
  }
  document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";
  return nextLanguage;
};

const categoryTranslations = {
  zh: {
    "art-books": {
      label: "艺术书籍",
      pageTitle: "艺术书籍"
    },
    paintings: {
      label: "绘画",
      pageTitle: "绘画"
    },
    "graphic-works": {
      label: "平面作品",
      pageTitle: "平面作品"
    },
    sculpture: {
      label: "立体作品",
      pageTitle: "立体作品"
    }
  }
};

const workTranslations = {
  zh: {
    "art-books-2024-01": {
      title: "龟兔赛跑",
      categoryLabel: "艺术书籍",
      medium: "无字书",
      description: `《龟兔赛跑》是一部以伊索寓言为文本起点的无字图画书实验。

伊索寓言《龟兔赛跑》起源于古希腊，经过近三千年的传播、翻译、改写与教育使用，已经成为儿童文学中最广为人知的故事之一。它常常被理解为关于“勤奋战胜懒惰”“耐心战胜傲慢”或“坚持最终获得胜利”的道德寓言。然而，在漫长的转述历史中，这个故事也不断被赋予新的解释：乌龟的胜利究竟来自努力，还是来自规则中的偶然？兔子的失败是对傲慢的惩罚，还是一次暂时脱离竞赛逻辑的行为？当这个故事被反复讲述时，它看似稳定的寓意也开始显露出内部的不确定性。

我的无字图画书《龟兔赛跑》正是从这种不确定性出发。它并不试图重新讲述一个关于输赢的儿童故事，而是希望拆解原寓言中被默认接受的结构：谁是主角，谁是对手？什么构成一场比赛？什么定义胜利？寓言中的角色是否必须代表固定的道德品质？读者是否必须接受一个单向的道德结论？这些问题成为这件作品的起点。

在这本书中，我将“解构”作为图画书叙事中的核心创作方法。通过移除文字说明，作品削弱了原故事的因果逻辑与教育目的，使兔子、乌龟、赛道、方向、终点线以及观看者之间的关系被重新组织。图像中的停顿、错位、留白与结构变化逐渐松动传统寓言中稳定的角色关系。兔子与乌龟不再只是“快与慢”或“傲慢与勤奋”的对立符号，而成为可以被重新观看和理解的两个存在。

书本自身的结构也成为叙事的一部分。封面上的圆形开口、贯穿全书的红线、可展开的空间结构，以及图像与物件之间的转换，使阅读不再只是翻页，而成为观看、进入和重新组合故事的过程。闭合时，封面形成一个完整图像；打开之后，它显露出新的空间关系。这种“闭合之后的开放”回应了作品的核心观念：经典并不是一个封闭的结论，而是一个可以被一次次重新进入的结构。

因此，《龟兔赛跑》并不是对原寓言的插图式复述，而是一项关于经典故事、儿童叙事和意义生成机制的视觉研究。它试图将寓言从固定的道德判断中释放出来，把故事重新交还给一个开放的阅读场域。读者不再只是接收寓言传递的结论，而是在图像和书籍结构中重新思考规则、对立、失败、胜利以及故事本身的可能性。

对我而言，这件作品真正关心的并不是“谁赢得了比赛”，而是当一个被反复讲述的经典故事被拆开并重新观看时，我们还能看见什么。`
    },
    "art-books-2022-02": {
      title: "我听见",
      categoryLabel: "艺术书籍",
      medium: "无字书",
      description: `《我听见》是一部关于“听见”与“存在”的无字图画书。

在中文里，“声音”的“声”和“生命”的“生”拥有相同的读音。这种偶然的语言关系成为这件作品最初的出发点。我开始思考：声音是否只是来自外部世界的信息？还是它也在持续塑造我们的情绪、记忆、关系与自我感？我们通过声音理解世界，也在声音中确认自身的存在。

我后来将这件作品命名为《我听见》。相比把“声音”作为抽象概念处理，我希望标题回到一个具体的主体：一个正在倾听、感受并被世界影响的人。“我听见”不仅是一种动作，也是一种感知世界的方式，是人在复杂声音场域中确认自身存在的状态。

在作品中，我将声音转化为可见的视觉经验。它有时像阴影一样扩张，有时像图案一样重复；它可能成为空间压力、集体噪音、社会规训，也可能成为一种难以言说的心理重量。我并不想描绘声音本身，而是想描绘声音进入一个人之后，在身体和心理中留下的反应。

这本书通过一系列左右页展开。左页通常呈现一个外部情境：冲突、规训、掌声、危险、诱惑、孤独，或来自自然与城市的声音；右页则回到个体，描绘人物面对这些声音时的状态。他们闭上眼睛、捂住耳朵、沉默、微笑，或只是安静地停留在画面中心。这些姿态并不只是对外部世界的拒绝，也是一种短暂的停顿，是重新确认自身感受的方式。

我选择无字图画书的形式，是因为我希望叙事不依赖文字解释，而通过图像之间的并置、重复与变化，让读者以自己的感知进入作品。黑、白、灰构成了书中的主要视觉语言，而小面积的颜色像被保留下来的生命信号，提示着在庞大的声音世界中，个体仍然拥有细微而真实的感受。

《我听见》并不只是一个关于逃离噪音的故事。对我而言，它更接近一个问题：当世界不断向我们发声，当他人的情绪、判断、期待和欲望持续进入我们的生活时，我们是否还能听见自己？我们是否能在听见与不听见之间，找到一种与世界共处的方式？

我想描绘的正是这种状态：声音构成世界，也塑造人。每个人都在世界的声音中，寻找属于自己的内在回声。`
    },
    "art-books-2020-03": {
      title: "影",
      categoryLabel: "艺术书籍",
      medium: "无字书",
      description: `《影》是一部关于自我认知的无字图画书。

影子是我们生活中最熟悉的存在之一，却也是最容易被忽视的存在之一。它紧紧跟随我们，有时顺从，有时固执；有时安静地贴附在身体旁边，有时又在光线下被无限放大。它像一面黑色的镜子，显露出我们也许并不愿意面对、却始终存在的另一部分自我。

在这件作品中，我以“影子”作为象征性的视觉词汇，表达自我认知过程中出现的困惑、逃避、对抗与突破。故事发生在一个荒诞而空白的白色空间中。主人公是这个世界里唯一的生命，也是唯一拥有影子的存在。起初，他并没有察觉影子的存在。随后，他开始观察它、怀疑它、恐惧它，最终试图逃离它，甚至试图消灭它。然而影子从未真正消失，它作为自我的另一面，与他共同存在。

人与影子的关系来自我对人格内部对立结构的思考。人并不是单一、透明或稳定的存在。我们内部既有理想化的自我，也有本能、欲望、恐惧和难以言说的幽暗部分。在《影》中，主人公与影子象征着这种冲突而不可分割的关系：当一个人试图摆脱影子时，他事实上是在试图摆脱自己的一部分。

我选择无字书的形式，是希望减少文字解释，让读者通过图像、节奏与沉默进入故事。极简的黑白图像、不断变化的影子，以及人物与周围空间之间的关系，共同构成了一种关于自我认知的视觉叙事。读者在翻页的过程中，不仅是在观看主人公与影子的斗争，也是在重新审视自己与内在阴影之间的关系。

对我而言，《影》并不是一个战胜黑暗的故事，而是关于重新理解黑暗。影子不是敌人，也不是缺陷。它是自我中无法分离的一部分。真正的突破并不来自彻底消灭影子，而是重新看见它、理解它，并最终学会与它共处。`
    },
    "art-books-2019-04": {
      title: "弥合",
      categoryLabel: "艺术书籍",
      medium: "无字书",
      description: `《弥合》是一部从一首诗出发的无字图画书。

这件作品的起点来自中国诗人顾城的一句诗：“现实断裂的地方，梦汇成了海。”这句话同时包含了断裂、梦、现实与海等多个意象，也暗示着从碎裂走向连接的可能性。我以这句话作为入口，结合顾城诗歌中反复出现的自然、童年、梦、孤独与内心世界等意象，创作了无字图画书《弥合》。

在这件作品中，我并不试图把诗歌翻译成一个清晰的故事，而是希望将诗中模糊、流动、难以把握的感受转化为一种视觉经验。画面中的绿色物质既像梦、水、植物，也像从现实裂缝中渗出的某种生命力；而灰色空间则形成一种安静、沉默、近乎废墟般的现实场域。当这两种元素在书页中相遇、流动和蔓延时，它们构成了一种悬置在现实与梦之间的视觉叙事。

为了回应朦胧诗中的象征性、暧昧性和意义的多重性，我为这本书设计了一种特殊的页面结构：它可以向左展开，也可以向右展开，并不存在固定的阅读顺序。读者不再沿着单一线性路径前进，而是在翻阅、展开、返回与重新组合中参与意义的生成。每一次阅读顺序的变化，都可能带来不同的联想与解释。

因此，《弥合》并不是对一首诗的插图式再现，而是一次关于诗如何成为书的实验。通过无字图画书的形式，我希望图像、纸张结构和阅读行为共同参与叙事。诗歌的暧昧性并没有被解释消解，而是在视觉和空间经验中被保留并延展。

对我而言，“弥合”并不意味着完全填补所有裂缝。它更像是在断裂中重新建立关系的过程：现实与梦、秩序与混乱、可见与不可见、诗与图像之间，在书的展开中短暂相遇。那些无法被语言完全说明的部分，正是我希望这件作品保留下来的空间。`
    },
    "art-books-2019-05": {
      title: "燕郊政治宣传标语",
      categoryLabel: "艺术书籍",
      medium: "摄影记录",
      description: `《燕郊政治宣传标语》是一项基于摄影记录与字体分析的书籍项目。

作品收集了我在中国河北省燕郊经济开发区街道中拍摄的大量政治宣传标语。燕郊位于北京与河北的交界处，是许多通勤至北京工作的人居住的区域。在这种城市环境中，政治标语频繁出现在道路两侧、施工围挡、建筑立面、社区入口和公共设施上。它们构成了一种日常可见却常被忽略的街道视觉景观。

在这件作品中，我首先通过摄影记录这些标语，保留它们在具体街道环境中的真实状态。随后，我从照片中提取部分标语，对其字体、字号、色彩使用、图文关系和视觉层级进行分析。红底黄字、粗黑字体、居中排版、大尺度标语以及强烈色彩对比等设计特征反复出现，形成了一种高度可识别的公共视觉语言。

书的后半部分收录了其他地区和国家的政治图像作品作为比较参照。通过这些比较，我希望将燕郊街头标语置于更广阔的政治视觉文化语境中，而不是仅仅把它们看作地方性的街道信息。不同地区的政治图像虽然在意识形态、媒介和视觉风格上各不相同，但都涉及文字、色彩、版式与公共空间之间的关系。

这本书并不试图给出明确的政治结论，也不直接批判或赞同这些标语。它更像是一份视觉档案和设计观察。通过摄影、收集、分类与版式分析，作品重新呈现了那些通常被吸收进日常背景中的公共图像。

我希望读者在阅读这本书时，能够暂时离开习惯性的观看方式，开始注意街头标语作为一种平面设计现象：它们如何被制作，如何占据空间，如何通过字体、色彩和排版建立视觉权威，又如何成为城市生活中稳定而重复的背景。`
    },
    "paintings-2025-01": {
      title: "倾斜的花瓶",
      categoryLabel: "绘画",
      medium: "丙烯",
      description: ""
    },
    "paintings-2025-02": {
      title: "腿怪",
      categoryLabel: "绘画",
      medium: "丙烯",
      description: ""
    },
    "paintings-2022-03": {
      title: "点线面的练习",
      categoryLabel: "绘画",
      medium: "数字",
      description: ""
    },
    "paintings-2019-06": {
      title: "弥合",
      categoryLabel: "绘画",
      medium: "系列绘画",
      description: ""
    },
    "paintings-2019-04": {
      title: "无题",
      categoryLabel: "绘画",
      medium: "针管笔、彩色铅笔",
      description: ""
    },
    "paintings-2017-05": {
      title: "《天亮之前》彩色练习",
      categoryLabel: "绘画",
      medium: "针管笔、数字",
      description: ""
    },
    "graphic-works-2024-01": {
      title: "维也纳应用艺术大学艺术节海报",
      categoryLabel: "学术项目",
      medium: "学术项目",
      description: ""
    },
    "graphic-works-2022-02": {
      title: "成为像素",
      categoryLabel: "平面作品",
      medium: "数字媒体",
      description: "在这里添加《成为像素》的作品介绍。"
    },
    "graphic-works-2019-03": {
      title: "天空湖",
      categoryLabel: "平面作品",
      medium: "摄影 / 数字制作",
      description: ""
    },
    "sculpture-2024-01": {
      title: "同心结",
      categoryLabel: "立体作品",
      medium: "纸雕塑",
      description: `《同心结》（The Love Knot）是一件受中国传统同心结启发而创作的雕塑作品。

在中国文化中，同心结是一种传统结饰，象征着爱情、结合与长久的陪伴。它并不仅仅是一种装饰性图案，而是一个由线、结、交织与连接共同构成的结构性图像。我感兴趣的，正是这一结构中所隐含的关系：两个独立的部分彼此靠近、交叉、拉扯，并最终形成一个新的整体。

这件作品的基本材料是白色纸盘。纸盘原本是普通、轻盈且一次性的日常物件。在大量重复连接之后，它们逐渐形成了两条巨大的绳状结构。这两组纸质结构在空间中交叉、缠绕、聚合，最终形成一个巨大的结。材料本身的轻盈与最终结构的体量之间形成了对比，使作品呈现出一种介于脆弱与坚固之间的状态。

我保留了纸盘原本的白色，以减少装饰性的干扰，将观看者的注意力引向结构、节奏与材料本身。重复的纸盘单元形成了一种近似鳞片、骨骼或生长组织的视觉效果，使这个结同时显得轻盈而密集，柔软而紧张。它并不是一个光滑、完整或被过度符号化的“爱”的图像，而是一个由许多微小连接共同支撑起来的空间结构。

对我而言，《同心结》并不是对“爱”的直接表达，而是对传统结饰语言的一种材料转译。通过纸盘这种普通材料，我希望重新思考同心结内部的结构关系——连接、交织与陪伴——并将其转化为一种可以通过尺度、重量、重复劳动与空间关系被观看、接近和重新感知的形式。

该作品曾展出于“EIN HAUFEN LIEBE / A PILE OF LOVE: Experiments in Sculptural Design”，这是由维也纳应用艺术大学平面设计班级举办的群展。展览于 2024 年 1 月 17 日至 28 日在维也纳 Schloss Neugebäude 举行。`
    }
  }
};

const siteCopy = {
  en: {
    brand: "Shawn Qi",
    copyright: "Copyright © Shawn Qi. All rights reserved.",
    nav: {
      "category-art-books.html": "Artist Books",
      "category-paintings.html": "Paintings",
      "category-graphic-works.html": "Graphic Works",
      "category-sculpture.html": "Sculptural Works",
      "about.html": "About",
      "contact.html": "Contact"
    },
    ui: {
      languageToggle: "中文",
      openMenu: "Open categories",
      closeMenu: "Close categories",
      closePreview: "Close preview",
      closeImagePreview: "Close image preview",
      viewDetails: "View Details",
      previousImage: "Previous image",
      nextImage: "Next image",
      missingWorkTitle: "Work not found",
      backHome: "Back to home",
      selectedWorks: "Selected works"
    },
    about: {
      title: "About",
      paragraphs: [
        `Shawn Qi (戚翔宇, b. 1997, Jinan, Shandong, China) is a graphic designer and picture book creator. His creative practice spans wordless picture books, visual narrative, artist’s books, and graphic design.`,
        `He received both his undergraduate and graduate education at the Central Academy of Fine Arts in Beijing. In the later years of his undergraduate studies, he joined the Picture Book Creation Studio, where he continued his research and practice in picture books, visual narrative, and the book as an artistic medium during his graduate studies. During this period, he also studied as an exchange student at the University of Applied Arts Vienna, Austria, in the Studio for Design and Narrative Media.`,
        `His work primarily takes the form of wordless picture books and artist’s books, exploring how images generate narrative, meaning, and reading experiences in the absence of text. Through the act of looking, turning pages, and reading visual structures, his practice investigates how philosophical reflection can be translated into visual narrative experience.`,
        `His original wordless picture book <em>Shadow</em> (《影》) received the Third Prize for Outstanding Graduation Project at the Central Academy of Fine Arts in 2020. As an illustrator, he published the picture books <em>The Love Knot</em> (《同心结》) and <em>The Little Sheep Pretends to Be a Tiger</em> (《小羊扮老虎》). As a picture book planning editor, he participated in the publication of several picture books, including <em>Snow Whites</em> (《“百”雪公主》) and <em>I Am Happy Here</em> (《在这里我很开心》). In 2023, <em>Breathe In, Breathe Out</em> (《吸呼》), a picture book for which he served as planning editor and art editor, was awarded The Beauty of Books in China.`,
        `He currently works full-time as a graphic designer in Japan, while continuing to develop independent IP projects and artistic experiments alongside his professional practice.`
      ]
    },
    contact: {
      title: "Contact",
      instagram: "Instagram",
      rednote: "RedNote",
      email: "Email"
    }
  },
  zh: {
    brand: "戚 翔宇",
    copyright: "© 戚翔宇 版权所有。保留所有权利。",
    nav: {
      "category-art-books.html": "艺术书籍",
      "category-paintings.html": "绘画",
      "category-graphic-works.html": "平面作品",
      "category-sculpture.html": "立体作品",
      "about.html": "关于",
      "contact.html": "联系方式"
    },
    ui: {
      languageToggle: "EN",
      openMenu: "打开分类",
      closeMenu: "关闭分类",
      closePreview: "关闭预览",
      closeImagePreview: "关闭图片预览",
      viewDetails: "查看详情",
      previousImage: "上一张图片",
      nextImage: "下一张图片",
      missingWorkTitle: "未找到作品",
      backHome: "返回首页",
      selectedWorks: "精选作品"
    },
    about: {
      title: "关于",
      paragraphs: [
        `Shawn Qi（戚翔宇，1997 年生于中国山东济南）是一名平面设计师与图画书创作者。他的创作实践涵盖无字图画书、视觉叙事、艺术家书与平面设计。`,
        `他本科及研究生阶段均就读于中央美术学院。大学本科后期，他进入绘本创作工作室，并在研究生阶段继续围绕图画书、视觉叙事以及作为艺术媒介的书籍展开研究与实践。在此期间，他也曾作为交换生就读于奥地利维也纳应用艺术大学的设计与叙事媒体工作室。`,
        `他的作品主要以无字图画书和艺术家书的形式展开，探索图像如何在没有文字的情况下生成叙事、意义与阅读经验。通过观看、翻页和阅读视觉结构的行为，他的实践研究哲学性的思考如何被转化为视觉叙事经验。`,
        `他的原创无字图画书 <em>Shadow</em>（《影》）于 2020 年获得中央美术学院优秀毕业创作三等奖。作为插画作者，他出版了图画书 <em>The Love Knot</em>（《同心结》）和 <em>The Little Sheep Pretends to Be a Tiger</em>（《小羊扮老虎》）。作为图画书策划编辑，他参与了多本图画书的出版，包括 <em>Snow Whites</em>（《“百”雪公主》）和 <em>I Am Happy Here</em>（《在这里我很开心》）。2023 年，他担任策划编辑与美术编辑的图画书 <em>Breathe In, Breathe Out</em>（《吸呼》）获得“中国最美的书”奖。`,
        `他目前在日本全职从事平面设计工作，同时持续推进个人原创 IP 项目与艺术实验。`
      ]
    },
    contact: {
      title: "联系方式",
      instagram: "Instagram",
      rednote: "小红书",
      email: "邮箱"
    }
  }
};

const localizeCategory = (category, language = getCurrentLanguage()) => {
  const translation = categoryTranslations[language]?.[category.key] || {};
  return {
    ...category,
    label: translation.label || category.label,
    pageTitle: translation.pageTitle || category.pageTitle
  };
};

const localizeWork = (work, language = getCurrentLanguage()) => {
  const translation = workTranslations[language]?.[work.id] || {};
  const category = findCategory(work.category);
  const localizedCategory = category ? localizeCategory(category, language) : null;

  return {
    ...work,
    title: translation.title || (language === "zh" && work.zhTitle ? work.zhTitle : work.title),
    categoryLabel: translation.categoryLabel || localizedCategory?.label || work.categoryLabel,
    medium: translation.medium || (language === "zh" && work.zhMedium ? work.zhMedium : work.medium),
    group: language === "zh" && work.zhGroup ? work.zhGroup : work.group,
    badge: language === "zh" && work.zhBadge ? work.zhBadge : work.badge,
    description: Object.prototype.hasOwnProperty.call(translation, "description")
      ? translation.description
      : work.description
  };
};

const getLocalizedWorks = (language = getCurrentLanguage()) =>
  works.map((work) => localizeWork(work, language));

window.supportedLanguages = supportedLanguages;
window.defaultLanguage = defaultLanguage;
window.languageStorageKey = languageStorageKey;
window.getCurrentLanguage = getCurrentLanguage;
window.setCurrentLanguage = setCurrentLanguage;
window.localizeCategory = localizeCategory;
window.localizeWork = localizeWork;
window.getLocalizedWorks = getLocalizedWorks;
window.siteCopy = siteCopy;
