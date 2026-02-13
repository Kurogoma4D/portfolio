import { Component, OnInit, OnDestroy, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  iconPath?: string;
}

interface ZennArticle {
  title: string;
  url: string;
  publishedAt: string;
}

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

interface WorkItem {
  title: string;
  description: string;
  tags: string[];
  url?: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private scrollHandler: (() => void) | null = null;

  protected readonly name = 'Kurogoma4D';
  protected readonly email = 'contact@krgm4d.dev';
  protected readonly location = '東京都渋谷区渋谷2-19-15宮益坂ビルディング609';
  protected readonly avatarUrl = '/kurogoma_chan_3.webp';
  protected readonly zennArticles = signal<ZennArticle[]>([]);
  protected readonly isMenuOpen = signal(false);
  protected readonly isScrolled = signal(false);

  protected readonly socialLinks: SocialLink[] = [
    {
      name: 'X (Twitter)',
      url: 'https://x.com/Kurogoma4D',
      icon: 'x'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Kurogoma4D',
      icon: 'github'
    },
    {
      name: 'Zenn',
      url: 'https://zenn.dev/kurogoma4d',
      icon: 'zenn',
      iconPath: '/zenn.svg'
    },
    {
      name: 'Cosense',
      url: 'https://scrapbox.io/kurogoma4d-lab/',
      icon: 'cosense',
      iconPath: '/cosence.svg'
    }
  ];

  protected readonly services: ServiceItem[] = [
    {
      title: 'モバイルアプリ開発',
      description: 'Flutter, iOS (Swift), Android (Kotlin), React Native/Expo によるクロスプラットフォーム開発',
      icon: 'mobile'
    },
    {
      title: 'Webアプリケーション開発',
      description: 'Angular, React 等のモダンフレームワークを用いた開発',
      icon: 'web'
    },
    {
      title: '技術コンサルティング',
      description: 'アーキテクチャ設計、技術選定、コードレビュー等の技術支援',
      icon: 'consulting'
    }
  ];

  protected readonly works: WorkItem[] = [
    {
      title: 'ScrapTo',
      description: 'インストールしたらいつも使っているHelpfeel Cosense（旧Scrapbox）の名前を設定するだけ！ブラウザの共有メニューからScrapToのアイコンを選べば、Helpfeel CosenseへWebサイトのタイトルとリンクをメモできます。',
      tags: ['Android', 'Kotlin'],
      url: 'https://scrapto.krgm4d.dev/'
    }
  ];

  ngOnInit(): void {
    this.http.get<ZennArticle[]>('/assets/zenn-articles.json')
      .subscribe({
        next: (articles) => {
          this.zennArticles.set(articles);
        },
        error: (error) => {
          console.error('Failed to load Zenn articles:', error);
          this.zennArticles.set([]);
        }
      });

    if (isPlatformBrowser(this.platformId)) {
      this.scrollHandler = () => {
        this.isScrolled.set(window.scrollY > 10);
      };
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (this.scrollHandler && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
