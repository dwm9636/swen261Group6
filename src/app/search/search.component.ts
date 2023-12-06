import { Component, OnDestroy } from '@angular/core';
import { MongoDBService } from '../mongodb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnDestroy {
  searchTerm: string = '';
  searchResults: any[] = [];
  private searchSubscription: Subscription = new Subscription();

  constructor(private mongodbService: MongoDBService) {}

  performSearch() {
    this.searchSubscription.add(
      this.mongodbService.getData(this.searchTerm).subscribe(
        (results) => {
          console.log('Received search results:', results);
          this.searchResults = results;
        },
        (error) => {
          console.error('Error fetching search results:', error);
        }
      )
    );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}

