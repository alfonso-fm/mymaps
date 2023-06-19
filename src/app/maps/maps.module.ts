import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = environment.mapbox_key;


import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MakersPageComponent } from './pages/makers-page/makers-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { CounterAloneComponent } from "../alone/components/counter-alone/counter-alone.component";
import { environment } from 'src/environments/environment';


@NgModule({
    declarations: [
        MiniMapComponent,
        MapsLayoutComponent,
        FullScreenPageComponent,
        MakersPageComponent,
        ZoomRangePageComponent,
        PropertiesPageComponent
    ],
    imports: [
        CommonModule,
        MapsRoutingModule,
        CounterAloneComponent,
        SideMenuComponent
    ]
})
export class MapsModule { }
