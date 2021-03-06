var assert = require('assert');

describe('Markets', function() {
    'use strict';
    
    before(function() {
        browser.windowHandleSize({width: 1024, height: 768});
    });
    
    after(function(done) {
        browser.end(done);
    });
    
    describe('Create Market', function() {
        it('go to markets page', function(done) {
            browser
                .url('http://localhost:8080/#markets')
                .getTitle(function(err, title) {
                    assert(err === null);
                    assert(title === 'Markets');
                })
                .call(done);
        });
      
        it('launch modal', function(done) {
            browser
                .waitFor('.js-addMarket')
                .click('.js-addMarket')
                .pause(2000) // wait for modal to fadeIn
                .call(done);
        });
        
        it('fill in and submit form', function(done) {
            browser
                .setValue('#name', 'test')
                .getValue('#name', function(err, value) {
                    assert(err === null);
                    assert(value === 'test');
                })
                .click('#location_id option[value="1"]')
                .click('#currency_id option[value="1"]')
                .click('.js-marketsFormSave')
                .pause(2000) // wait for modal to fadeOut
                .call(done);
        });
        
        it('test number of rows in table is 1', function(done) {
            browser
                .elements('.js-marketsTable tbody tr', function(err, elements) {
                    assert(err === null);
                    assert(elements.value.length === 1);
                })
                .call(done);
        });
        
        it('test title in first row', function(done) {
            browser
                .getText('.js-marketsTable tbody tr:nth-child(1) td:nth-child(1)', function(err, result) {
                    assert(err === null);
                    assert(result === 'test');
                })
                .call(done);
        });
    });
    
    describe('Edit Market', function() {
        it('go to markets page', function(done) {
            browser
                .url('http://localhost:8080/#markets')
                .getTitle(function(err, title) {
                    assert(err === null);
                    assert(title === 'Markets');
                })
                .call(done);
        });
        
        it('launch modal', function(done) {
            browser
                .waitFor('.js-marketsTable tbody tr:nth-child(1) td:nth-child(6)')
                .click('.js-marketsTable tbody tr:nth-child(1) td:nth-child(6) a.js-edit')
                .pause(2000) // wait for modal to fadeIn
                .call(done);
        });
        
        it('fill in and submit form', function(done) {
            browser
                .setValue('#name', 'test2')
                .click('.js-marketsFormSave')
                .pause(2000) // wait for modal to fadeOut
                .call(done);
        });
        
        it('test number of rows in table is 1', function(done) {
            browser
                .elements('.js-marketsTable tbody tr', function(err, elements) {
                    assert(err === null);
                    assert(elements.value.length === 1);
                })
                .call(done);
        });
        
        it('test title in first row', function(done) {
            browser
                .getText('.js-marketsTable tbody tr:nth-child(1) td:nth-child(1)', function(err, result) {
                    assert(err === null);
                    assert(result === 'test2');
                })
                .call(done);
        });
    });
    
    describe('Delete Market', function() {
        it('go to markets page', function(done) {
            browser
                .url('http://localhost:8080/#markets')
                .getTitle(function(err, title) {
                    assert(err === null);
                    assert(title === 'Markets');
                })
                .call(done);
        });
        
        it('delete market', function(done) {
            browser
                .waitFor('.js-marketsTable tbody tr:nth-child(1) td:nth-child(6)')
                .click('.js-marketsTable tbody tr:nth-child(1) td:nth-child(6) a.js-delete')
                .call(done);
        });
        
        it('test number of rows in table is 0', function(done) {
            browser
                .elements('.js-marketsTable tbody tr', function(err, elements) {
                    assert(err === null);
                    assert(elements.value.length === 0);
                })
                .call(done);
        });
    });
});