import { Component, OnInit } from '@angular/core';

interface NewsPost {
  id: number;
  title: string;
  author: string;
  date: Date;
  content: string;
  image?: string;
  preview?: string;
}

@Component({
  selector: 'ptcg-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public featuredPost: NewsPost | null = null;
  public regularPosts: NewsPost[] = [];
  public selectedPost: NewsPost | null = null;

  ngOnInit(): void {
    this.loadNews();
  }

  selectPost(post: NewsPost) {
    this.selectedPost = post;
  }

  private loadNews() {
    // Mock data for news posts
    const posts: NewsPost[] = [
      {
        id: 1,
        title: 'Welcome to Twinleaf',
        author: 'Joe',
        date: new Date('2024-12-26'),
        content: `Hello everyone!
        
It's so great to finally have Twinleaf available to the public. It's been a long year and a half of development, but I'm grateful to have had help from Eric and Tommy over the past several months. I hope you all enjoy what we've made, and if you have any suggestions or questions, bug reports or anything else, please don't hestitate to check out our Discord server!

We will use this News section to not only post feature updates, but also changelogs with bug fixes.

If you want to connect personally, you can find me on X @The_EPSD. Thank you all and I can't wait to hear feedback from everyone!
        
Joe`,
        image: 'https://pbs.twimg.com/media/F0C__sdXoAEMKtn?format=jpg',
        preview: `We're excited to finally have you all here!`,
      },
      {
        id: 2,
        title: 'Twinleaf Update - December 26th',
        author: 'Joe',
        date: new Date('2024-12-27'),
        content: `Twinleaf Update - December 26th
      
Engine:
- Added News Section

Cards:
- Fixed an issue where Morpeko PAR's Energizer Wheel could attach to multiple targets
- Fixed card text issues with Judge FST, Explorer's Guidance TEF
- Fixed prompt description issues with Nest Ball SVI
- Fixed incorrect set code numbers with Piers CPA, Sonia CPA, Mallow GRI
- Added Toedscool PAR 16  `,
        image: 'https://pbs.twimg.com/media/F0C__sdXoAEMKtn?format=jpg&name=large',
        preview: 'Update #2024.12.26'
      },
      {
        id: 3,
        title: 'Twinleaf Update - December 27th',
        author: 'Joe',
        date: new Date('2024-12-28'),
        content: `Twinleaf Update - December 27th
      
Engine:
- Introducing Standard Nightly!
    - Standard Nightly is where testing for upcoming cards can be used.
    - Regulation F is banned
    - Regulation I is legal
- Fixed an issue in the Game Log where it was not displaying Usernames
- Fixed an issue in the Deck Editor where Windows users could not use apostrophe's

Cards:
- Fixed bugs in the following:
    - Frosmoth SSH
    - Mesagoza SVI
    - Gardevoir CRE
- Fixed numerous cards missing their correct Set Numbers
- Added SV9 Cards:
- Exchange Ticket SV9
- Hop's Choice Band SV9
- Hop's Dubwool SV9
- Hop's Snorlax SV9
- Hop's Wooloo SV9
- Hop's Zacian ex SV9
- Iono's Bellibolt ex SV9
- Iono's Kilowattrel SV9
- Iono's Tadbulb SV9
- Iono's Voltorb SV9
- Iono's Wattrel SV9
- Lillie's Comfy SV9
- Mamoswine ex SV9
- N's Darmanitan SV9
- N's Darumaka SV9
- N's Reshiram SV9
- N's Zoroark ex SV9
- Piloswine SV9
- Swinub SV9`,
        image: 'https://pbs.twimg.com/media/F0C__sdXoAEMKtn?format=jpg&name=large',
        preview: 'Update #2024.12.27'
      },
      {
        id: 3,
        title: 'Twinleaf Update - December 28th',
        author: 'Joe',
        date: new Date('2024-12-29'),
        content: `Twinleaf Update - December 28th
      
Engine:
- Added "Settings" to your User dropdown in the top-right
    - Settings can now be accessed from anywhere in-app
- Corrected the behaviour of AbstractAttackEffects that automatically cause a KO
    - Cards like Alolan Exeggutor ex were not able to KO Tera Pokémon. This has been fixed.

Cards:
- Fixed errors with the following cards:
    - Regidrago VSTAR SIT
    - Jubilife Village ASR
    - Exchange Ticket SV9
    - Iono's Wattrel SV9
    - Charmeleon OBF
    - Veluza PAR
    - Hop's Wooloo SV9
    - Hop's Dubwool SV9
    - Hop's Zacian ex SV9
    - Lillie's Comfy SV9
    - Mamoswine ex SV9`,
        image: 'https://pbs.twimg.com/media/F0C__sdXoAEMKtn?format=jpg&name=large',
        preview: 'Update #2024.12.28'
      },
    ];

    posts.sort((a, b) => b.date.getTime() - a.date.getTime());

    this.featuredPost = posts[0];
    this.regularPosts = posts.slice(1);
  }

  getAuthorInitial(author: string | undefined): string {
    if (!author) {
      return '';
    }
    if (author === 'Joe') {
      return 'J';
    }
    if (author === 'Tommy') {
      return 'T';
    }
    return author;
  }
}