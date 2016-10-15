import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
declare var dhtmlXLayoutObject: any;
declare var dhtmlXForm: any;


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html', 
  styleUrls: [ 'heroes.component.css' ]

})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  newHeroe():void{
    var formData = [
          {type: "settings", position: "label-right", labelWidth: "auto", inputWidth: 130},
          {type: "label", label: "Formulario Registro"},
          {type: "btn2state", label: "Mis cuenta", inputWidth: 42, checked: true, list:[
              {type: "settings", labelWidth: 90, inputWidth: 200, position: "label-left"},
              {type: "input", name: "name", label: "Nombre completo"},
              {type: "input", name: "t", label: "Usuario", },
              {type: "password", name: "pwd", label: "Password"},
          ]},
          {type: "block", width: "auto", offsetTop: 10, list:[
              {type: "button", name:"save",value: "Guardar", offsetLeft: 50},
              {type: "newcolumn"},
              {type: "button", name:"cancel",value: "Cancelar", offsetLeft: 8}
          ]}
      ];

    var myForm = new dhtmlXForm("example-dhtmlx", formData);
    myForm.attachEvent('onButtonClick', function(name){
      if(name=="save"){
        this.add(myForm.getItemValue("name"));
      }
    });

  }

  delete(hero: Hero): void {
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  gotoDetail(hero: Hero): void {
    let link = ['/detail', this.selectedHero.id];
    this.router.navigate(link);
  }
}
