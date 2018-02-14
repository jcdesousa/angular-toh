import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Spider-Man' },
      { id: 12, name: 'Iron Man' },
      { id: 13, name: 'Captain America' },
      { id: 14, name: 'Deadpool' },
      { id: 15, name: 'Daredevil' },
      { id: 16, name: 'Thor' },
      { id: 17, name: 'Hulk' },
      { id: 18, name: 'Doctor Strange' },
      { id: 19, name: 'Wolverine' },
      { id: 20, name: 'Black Widow' }
    ];
    return {heroes};
  }
}
