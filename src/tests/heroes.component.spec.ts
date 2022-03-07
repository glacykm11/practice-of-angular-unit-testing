import { of } from 'rxjs';
import { HeroesComponent } from './../app/heroes/heroes.component';

describe('Heroes Component', () => {

    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'SpiderGuy', strength: 9},
            {id: 3, name: 'SpiderFellow', strength: 10}
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

        component = new HeroesComponent(mockHeroService);
    })
    
    describe('delete', () =>{

        it('should remove the indicated hero from the heroes list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            component.delete(HEROES[2]);
            
            expect(component.heroes.length).toBe(2);
        })

        it('should call deleteHeroes with the correct params', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        })
    })
})