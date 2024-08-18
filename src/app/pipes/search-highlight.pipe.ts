import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHighlight',
  standalone: true,
})
export class SearchHighlightPipe implements PipeTransform {
  transform(value: string, searchQuery: string): string {
    if (!searchQuery) {
      return value;
    }

    const re = new RegExp(`(${ searchQuery })`, 'gi');
    return value.replace(re, '<span class="search-highlight">$1</span>');
  }
}
