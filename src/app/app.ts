import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  iconPath?: string; // For custom logo files
}

interface ZennArticle {
  title: string;
  url: string;
  publishedAt: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);

  protected readonly name = 'Kurogoma4D';
  protected readonly email = 'contact@krgm4d.dev';
  protected readonly location = '東京都渋谷区渋谷2-19-15宮益坂ビルディング609';
  protected readonly avatarUrl = '/kurogoma_chan_3.webp';
  protected readonly zennArticles = signal<ZennArticle[]>([]);

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

  ngOnInit(): void {
    // Load Zenn articles from pre-built JSON
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
  }
}
