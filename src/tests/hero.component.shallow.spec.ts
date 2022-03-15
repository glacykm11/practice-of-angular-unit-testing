import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroComponent } from "src/app/hero/hero.component";

describe('HeroComponent (shallow)', () => {
    let fixture: ComponentFixture<HeroComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
        });

        fixture = TestBed.createComponent(HeroComponent);
    })

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {id:1, name: "SuperMan", strength: 3};

        expect(fixture.componentInstance.hero.name).toEqual("SuperMan")
    })
})