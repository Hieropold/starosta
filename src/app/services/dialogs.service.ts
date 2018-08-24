import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

  private phrases = {
    'near-litmo': {
      'ilya': [
        'Шура: Здорово, как жизнь?',
        'Ильец: Не очень хорошо. Вчера хотел сплести себе нижнее белье, но кончилась проволока. Теперь не знаю, что делать...'
      ]
    }
  };

  constructor() {
  }

  show(scene: string, char: string) {
    const sceneEl = document.getElementsByClassName('scene')[0];

    const dialogEl = document.createElement('div');
    dialogEl.className = 'dialog';

    let phraseEl;
    for (let i = 0; i < this.phrases[scene][char].length; i++) {
      phraseEl = document.createElement('div');
      phraseEl.innerHTML = this.phrases[scene][char][i];
      dialogEl.appendChild(phraseEl);
    }

    sceneEl.appendChild(dialogEl);

    window.setTimeout(() => {
      sceneEl.removeChild(dialogEl);
    }, 10000);
  }
}
