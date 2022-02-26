import { HeroesComponent } from './../app/heroes/heroes.component';

describe('Heroes Component', () => {

    let component: HeroesComponent;
    let HEROES;

    beforeEach(() =>{
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'SpiderGuy', strength: 9}
        ]
        const mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
        component = new HeroesComponent(mockHeroService);
    })

    describe('delete', () =>{

        it('should remove the indicated hero from the heroes list', () => {
            component.heroes = HEROES;

            component.delete(HEROES[2]);
            
            expect(component.heroes.length).toBe(2);
        })
    })
})