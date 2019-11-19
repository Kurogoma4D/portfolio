export type SkillItem = {
  name: string;
  relation?: string;
  description?: string;
};

export const regularSkills: SkillItem[] = [
  {
    name: "Dart",
    relation: "Flutter",
    description:
      "個人開発，業務開発で使用．勉強会にも参加するなど，個人的に注目度の高い技術．"
  },
  {
    name: "HTML/CSS/JS",
    relation: "Sass, TypeScript, enchant.js，three.js，React，AR.js，jQuery",
    description: "個人開発，業務開発で使用．"
  },
  {
    name: "Python",
    relation: "Jupyter Notebook，IPython，Django",
    description:
      "3系：研究でのデータ処理・分析，業務開発で使用．2系：Cinema4Dのスクリプトとして使用．"
  },
  {
    name: "C言語",
    description:
      "高専一年次より講義で使用．プログラミングの基礎，アルゴリズム，データ構造，組み込みプログラミング，ニューラルネットワークなど"
  }
];

export const poorSkills: SkillItem[] = [
  { name: "C#" },
  { name: "C++" },
  { name: "Java" },
  { name: "PHP" },
  { name: "Golang" },
  { name: "Objective-C" },
  { name: "Processing" },
  { name: "Arduino" },
  { name: "GLSL" }
];

export const designSkills: SkillItem[] = [
  {
    name: "Cinema4D",
    description:
      "3DCG制作のときにメインで使用するツール．Octane Renderを使用したフォトリアル レンダリングを主に行う．Pythonを用いた外部連携も可能．"
  },
  {
    name: "Adobe CC",
    relation: "Photoshop, Xd, Lightroom, Illustrator",
    description: "3DCG制作時や，プロトタイプ，スライド作成に使用．"
  }
];
