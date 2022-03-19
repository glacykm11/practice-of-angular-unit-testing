import { ComponentFixture, TestBed } from "@angular/core/testing"
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { HeroComponent } from "src/app/hero/hero.component";
import { By } from "@angular/platform-browser";

describe('HeroComponent (shallow)', () => {
    let fixture: ComponentFixture<HeroComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroComponent);
    })

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {id:1, name: "SuperMan", strength: 3};

        expect(fixture.componentInstance.hero.name).toEqual("SuperMan")
    })

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {id:1, name: "SuperMan", strength: 3};
        fixture.detectChanges();

        // let deA = fixture.debugElement.query(By.css('a'));
        // expect(deA.nativeElement.textContent).toContain("SuperMan");

        expect(fixture.nativeElement.querySelector('a').textContent).toContain("SuperMan");
    })
})