import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './rucksack.page.html',
  styleUrls: ['./rucksack.css']
})
export class RucksackPage {

  private returnBack: string;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.returnBack = params['return'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onBackClick() {
    this.router.navigateByUrl(this.returnBack);
  }
}
