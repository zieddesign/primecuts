import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AdvisorService {
    private showAdvisorSource = new BehaviorSubject<boolean>(false);
    showAdvisor$ = this.showAdvisorSource.asObservable();

    open() { this.showAdvisorSource.next(true); }
    close() { this.showAdvisorSource.next(false); }
}