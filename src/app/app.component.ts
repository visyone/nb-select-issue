import { Component, ViewChild } from '@angular/core';
import { NbOptionComponent, NbSelectComponent } from '@nebular/theme';
import { isEqual } from 'lodash';

interface SelectableItem {
  id: number;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // static elemements
  public selectedStaticItem = 1;
  public staticItems: SelectableItem[] = [
    {
      id: 1,
      label: 'Rome'
    },
    {
      id: 2,
      label: 'Paris'
    },
    {
      id: 3,
      label: 'London'
    }
  ];

  // dynamic elements
  public selectedDynamicItem: number | null = 1;
  public dynamicItems: SelectableItem[] = [{
    id: 1,
    label: 'Audi'
  },];
  @ViewChild('dynamicSelect', { static: true }) dynamicSelect: NbSelectComponent | null = null;

  /**
   * Method suggested by @rardila-uniajc in nebular issue {@link https://github.com/akveo/nebular/issues/2145}
   */
  static setOptionNbSelect(selectComponent: NbSelectComponent | null, optToCompare: any) {
    setTimeout(() => {
      if (selectComponent) {
        const selectedOptions: NbOptionComponent<SelectableItem>[] = [];
        for (const option of selectComponent.options['_results']) {
          if (isEqual(optToCompare, option['value'])) {
            selectedOptions.push(option);
            break;
          }
        }
        for (const option of selectedOptions) {
          selectComponent['selectOption'](option);
        }
        selectComponent['cd'].detectChanges();
      }
    }, 500);
  }

  public ngOnInit() {
    // populate the select dynamically while selected item is already defined
    setTimeout(() => {
      this.dynamicItems = [
        {
          id: 1,
          label: 'Ferrari'
        },
        {
          id: 2,
          label: 'Mercedes'
        },
        {
          id: 3,
          label: 'Lamborghini'
        }
      ];

      /***************************************************** 
       * uncomment out to resolve the issue with a workaround
       * ***************************************************/ 
      // this.refreshSelect();

    }, 1500);

  }

  private refreshSelect() {
    AppComponent.setOptionNbSelect(this.dynamicSelect, this.selectedDynamicItem);
  }
}
