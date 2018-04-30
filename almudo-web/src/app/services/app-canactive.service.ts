import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GetConfigService } from '../shared';


@Injectable()
export class AppCanactiveService implements CanActivate {

  constructor(private config: GetConfigService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const res = await this.config.setConfigInitial();
    return res;
  }

}
