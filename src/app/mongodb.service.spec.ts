import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MongoDBService } from './mongodb.service';

describe('MongodbService', () => {
  let service: MongoDBService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MongoDBService]
    });

    // Inject the service (and the mock HTTP service)
    service = TestBed.inject(MongoDBService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from the server', () => {
    const testData = [{ name: 'Item 1' }, { name: 'Item 2' }];

    service.getData('searchTerm').subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne('your_api_endpoint/searchTerm');
    expect(req.request.method).toBe('GET');

    req.flush(testData);

    httpMock.verify();
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests
    httpMock.verify();
  });
});


