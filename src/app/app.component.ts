import { Component } from '@angular/core';
import { MongoDBService } from './mongodb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "attemptFour"
  searchTerm: string = '';
  searchResults: any[] = []; // Change the type based on your data structure

  constructor(private mongodbService: MongoDBService) {}

  performSearch() {
    console.log('Sending search term:', this.searchTerm);
    this.mongodbService.getData(this.searchTerm).subscribe(
      (results) => {
        console.log('Received search results:', results);
        this.searchResults = results;
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }
}
