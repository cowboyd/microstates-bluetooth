
import Union from '@microstates/union';

class Effect {
  reset() {
    return this.toInactive();
  }
}

function Inactive(Effect) {
  return class Inactive extends Effect {
    activate() {
      return this.willActivate().didActivate();
    }

    willActivate() {
      return this.toActivating();
    }
  }
}

function Activating(Effect) {
  return class Activating extends Effect {
    didActivate() {
      return this.toActive();
    }
  }
}

function Active(Effect) {
  return class Active extends Effect {
    deactivate() {
      return this.willDeactivate().didDeactivate();
    }
    willDeactivate() {
      return this.toDeactivating();
    }
  }
}

function Deactivating(Effect) {
  return class Deactivating extends Effect {
    didDeactivate() {
      return this.toInactive();
    }
  }
}

function Errored(Effect) {
  return class Errored extends Effect {}
}

export default Union({ Inactive, Activating, Active, Deactivating, Errored }, Effect);
