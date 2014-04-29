define(
    [
        'keel/BaseView',
        'app/widgets/navbar/NavBarWidget',
        'app/widgets/markets/MarketsTableWidget',
        'app/widgets/markets/MarketsModalWidget',
        'app/domain/Market',
        'app/domain/Markets',
        'text!app/pages/Markets/MarketsPageTemplate.html'
    ],
    function(BaseView, NavBarWidget, MarketsTableWidget, MarketsModalWidget, Market, Markets, MarketsPageTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'section',
            id: 'markets-page',

            template: {
                name: 'MarketsPageTemplate',
                source: MarketsPageTemplate
            },
            
            elements: [
                'markets'
            ],
            
            events: {
                'click .js-addMarket': 'addMarket',
            },
            
            initialize: function() {
                this.markets = new Markets();
            },
            
            postRender: function() {
                this.addChildren([
                    {
                        id: 'NavBarWidget',
                        viewClass: NavBarWidget,
                        parentElement: this.$el
                    },
                    {
                        id: 'MarketsTableWidget',
                        viewClass: MarketsTableWidget,
                        parentElement: $(this.marketsElement),
                        options: {
                            collection: this.markets
                        }
                    }
                ]);
                
                return this;
            },
            
            // events
            addMarket: function(e) {
                e.preventDefault();
                
                // create model view
                var marketsModalWidget = new MarketsModalWidget({
                    collection: this.markets,
                    model: new Market(),
                    mode: 'create'
                });
                
                $('body').append(marketsModalWidget.render().$el);
                
                // remove modal view when it's hidden
                $('#marketsModal').on('hidden.bs.modal', function (e) {
                    marketsModalWidget.remove();
                });
                
                // show modal
                $('#marketsModal').modal('show');
            }
        });
    }
);