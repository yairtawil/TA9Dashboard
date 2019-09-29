import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../user.model';
import { environment } from '../../../environments/environment';
import io from 'socket.io-client';
import * as faker from 'faker';
import { IUsersState } from '../store/users.state';
import { Store } from '@ngrx/store';
import * as userActions from '../store/user.actions';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(protected http: HttpClient, protected store: Store<IUsersState>, protected deviceService: DeviceDetectorService) {
    this.connectSocket();
  }

  currentUser(id: string): IUser {
    const deviceInfo = this.deviceService.getDeviceInfo();
    return {
      id,
      ip: `127.0.0.${faker.random.number(100)}`,
      name: faker.name.findName(),
      isConnected: true,
      resolution: `${window.screen.width * window.devicePixelRatio}x${window.screen.height * window.devicePixelRatio}`,
      lastSeen: new Date(),
      os: deviceInfo.os,
      browser: deviceInfo.browser
    };
  }

  private connectSocket() {
    const socket = io.connect(environment.usersApi);

    socket.on('connect', () => {
      const currentUser = this.currentUser(socket.io.engine.id);
      this.store.dispatch(userActions.setCurrentUserId({ currentUserId: socket.io.engine.id }));
      socket.emit('[SOCKET] Connect', currentUser);
    });

    socket.on('[SOCKET] All Users', (users) => {
      this.store.dispatch(userActions.addAll({ users }));
    });

    socket.on('[SOCKET] Connect', (user) => {
      this.store.dispatch(userActions.addOne({ user }));
    });

    socket.on('[SOCKET] Disconnect', (id) => {
      this.store.dispatch(userActions.updateOne({ id, changes: { isConnected: false } }));
    });
  }
}
