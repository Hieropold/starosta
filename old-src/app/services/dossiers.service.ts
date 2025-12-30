import { Injectable } from '@angular/core';

@Injectable()
export class DossiersService {

  private dossiers = {
    lukich: {
      pic: '/assets/img/photos/lukich.jpg',
      summary: [
        `Имя: А${this.expandReplacer(7)}р Л${this.expandReplacer(6)}в`,
        'Он же: Малыш, Мохнорылый, Шура, Пушистый.',
        'Рост: 16,3442 ангстрем.',
        'Скорость роста щетины: 34 см/мин.',
        'Очень любит водку, но боится алкоголизма,',
        'из-за чего страдает. В потреблении спиртных напитков',
        'ограничен малой пропускной способностью печени.'
      ]
    }
  };

  constructor() {
  }

  show(char: string) {
    this.hide();

    const sceneEl = document.getElementsByClassName('scene')[0];

    // Generate a new dossier element
    const dossierEl = document.createElement('div');
    dossierEl.className = 'dossier';

    // Generate char image element
    const imageEl = document.createElement('div');
    imageEl.className = 'dossier__userpic';
    imageEl.innerHTML = `<img src="${this.dossiers[char].pic}"/>`;
    dossierEl.appendChild(imageEl);

    // Generate dossier summary block
    const summaryEl = document.createElement('div');
    summaryEl.className = 'dossier__summary';
    for (let line of this.dossiers[char].summary) {
      summaryEl.innerHTML += `<div class="dossier__summary-line">${line}</div>`;
    }
    dossierEl.appendChild(summaryEl);

    sceneEl.appendChild(dossierEl);
  }

  hide() {
    const sceneEl = document.getElementsByClassName('scene')[0];

    // Clean up existing dossiers (if any)
    const existingDossierEls = Array.from(document.getElementsByClassName('dossier'));
    for (let el of existingDossierEls) {
      sceneEl.removeChild(el);
    }
  }

  private expandReplacer(count: number) {
    let expanded = '';
    for (; count > 0; count--) {
      expanded += '&#x2660';
    }
    return expanded;
  }
}
