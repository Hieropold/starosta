import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

  private phrases = {
    'future': {
      'vasily': [
        'Шура: Ну, предводитель, я готов...',
        'Василий: С богом. Вся цивилизация надеется на тебя.',
        'Шура: Если я не вернусь, позаботьтесь о моей маленькой шестиголовой крыске.',
        'Василий: Хорошо, мой маленький друг.'
      ]
    },
    'near-litmo': {
      'ilya': [
        'Шура: Здорово, как жизнь?',
        'Ильец: Не очень хорошо. Вчера хотел сплести себе нижнее белье, но кончилась проволока. Теперь не знаю, что делать...'
      ],
      'navroid': [
        'Шура: Привет! Чего такой хмурый?',
        'Навроид: Хреново мне... Пи... Пива необходимо выпить!!!'
      ]
    }
  };

  private cleanupTimers = [];

  constructor() {
  }

  show(scene: string, char: string) {
    const sceneEl = document.getElementsByClassName('scene')[0];

    // Clean up existing dialogs
    this.cleanupTimers.forEach((timerId) => {
      window.clearTimeout(timerId);
    });
    const existingDialogEls = Array.from(document.getElementsByClassName('dialog'));
    for (let el of existingDialogEls) {
      sceneEl.removeChild(el);
    }

    // Generate a new one
    const dialogEl = document.createElement('div');
    dialogEl.className = 'dialog';

    const skipEl = document.createElement('div');
    skipEl.className = 'dialog__skip';
    skipEl.innerHTML = 'далее';
    skipEl.onclick = () => {
      sceneEl.removeChild(dialogEl);
    };
    dialogEl.appendChild(skipEl);

    let phraseEl;
    for (let i = 0; i < this.phrases[scene][char].length; i++) {
      phraseEl = document.createElement('div');
      phraseEl.className = 'dialog__phrase';
      phraseEl.innerHTML = this.phrases[scene][char][i];
      dialogEl.appendChild(phraseEl);
    }

    sceneEl.appendChild(dialogEl);

    const timerId = window.setTimeout(() => {
      sceneEl.removeChild(dialogEl);
    }, 10000);

    this.cleanupTimers.push(timerId);
  }
}
