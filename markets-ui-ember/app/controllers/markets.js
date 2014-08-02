import Ember from 'ember';

export default Ember.ArrayController.extend({
  locations: Ember.computed(function() {
    return this.store.find('location');
  }),
  
  currencies: Ember.computed(function() {
    return this.store.find('currency');
  }),
  
  actions: {
    openModal: function() {
      $('#marketsModal').modal('show');
    },
    
    locationChange: function(value) {
      Ember.set(this, 'location', parseInt(value));
    },
    
    currencyChange: function(value) {
      Ember.set(this, 'currency', parseInt(value));
    },
    
    createMarket: function() {
      var controllerContext = this;
      
      var params = {
        name: this.get('name'),
        start_date: this.get('start_date'),
        end_date: this.get('end_date')
      };

      var market = this.store.createRecord('market', params);
      
      var relationships = {
        location: this.store.find('location', this.get('location')),
        currencie: this.store.find('currency', this.get('currency'))
      }
      
      Ember.RSVP.hash(relationships).then(function(relationships) {
        market.set('location', relationships.location);
        market.set('currency', relationships.currencie);
        
        controllerContext.set('name', '');
        controllerContext.set('location', '');
        controllerContext.set('currency', '');
        controllerContext.set('start_date', '');
        controllerContext.set('end_date', '');
        
        market.save();
      });
    }
  }
});