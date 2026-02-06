import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  iconPath?: string; // For custom logo files
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly name = 'Kurogoma4D';
  protected readonly location = '東京都渋谷区渋谷2-19-15宮益坂ビルディング609';
  protected readonly avatarUrl = '/kurogoma_chan_3.webp';

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
}
