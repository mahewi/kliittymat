 /* This code is derived from Numeric in touch charts
 */

Ext.define('Ext.chart.axis.HappCoNumeric', { 
 
    extend: 'Ext.chart.axis.Numeric',
    alias: 'axis.happconumeric',
    type: 'happconumeric',

    config: {
        xAxisPadding: 20,
        descriptions: ['A', 'B'],
        descriptionColor: '0x000000',
    },

    drawDescriptions: function(maxWidth) {
        var me = this,
            surface = me.getLabelSurface(),
            labelGroup = me.labelGroup,
            endLabelStyle = Ext.apply( {}, me.labelStyle.style || {} );
            displaySpriteTop = me.displaySpriteTop,
            displaySpriteBottom = me.displaySpriteBottom, 
            descBottom = me.getDescriptions() [0],
            descTop = me.getDescriptions() [1],
            bbox = me.getChart().chartBBox,
            maxHeight = me.getStartY() - me.getY() - 10, 
            padding = 20, 
            yTop = 0 + padding, 
            yBottom = bbox.height - padding,
            x = 5; 

        endLabelStyle.color = me.getDescriptionColor(); 

        if (displaySpriteTop) {
            displaySpriteTop.setAttributes(Ext.apply({
                text: descTop
            }, endLabelStyle),true);
        } else {
            displaySpriteTop = me.displaySpriteTop = 
              surface.add({
                type: 'text',
                x: 0,
                y: yTop, 
                text: descTop,
              });
            surface.renderItem(displaySpriteTop);
            displaySpriteTop._bbox = displaySpriteTop.getBBox();
        }
        x = displaySpriteTop._bbox.height / 2;
        yTop = yTop + displaySpriteTop._bbox.width;
        displaySpriteTop.setAttributes({
            x: x,
            y: yTop,
            rotation: {
                degrees: -90,
                x: x,
                y: yTop, 
            },
        });
        
        if (displaySpriteBottom) {
            displaySpriteBottom.setAttributes(Ext.apply({
                text: descBottom
            }, endLabelStyle),true);
        } else {
            displaySpriteBottom = me.displaySpriteBottom = 
              surface.add({
                type: 'text',
                x: x,
                y: yBottom, 
                text: descBottom,
              });
            surface.renderItem(displaySpriteBottom);
            displaySpriteBottom._bbox = displaySpriteBottom.getBBox();
        }
        displaySpriteBottom.setAttributes({
            x: x,
            y: yBottom,
            rotation: {
                degrees: -90,
                x: x,
                y: yBottom, 
            },
        });
    },

    drawLabel: function() {
        if (!this.inflections) {
            return 0;
        }

        var me = this,
            labelGroup = me.labelGroup,
            inflections = me.inflections,
            surface = me.getLabelSurface(),
            maxWidth = 0,
            ln, i;

        // If we are switching between rendering labels to the axis surface and the main
        // chart surface, then we need to blow away all existing labels and let them get
        // re-created on the new surface
        if (me.lastLabelSurface !== surface) {
            labelGroup.each(function(sprite) {
                sprite.destroy();
            });
            labelGroup.clear();
            me.lastLabelSurface = surface;
        }

        maxWidth = me.drawVerticalLabels() + me.getXAxisPadding();

        // Hide unused label sprites
        ln = labelGroup.getCount();
        i = inflections.length;
        for (; i < ln; i++) {
            labelGroup.getAt(i).hide(true);
        }

        me.bbox = {};
        Ext.apply(me.bbox, me.axisBBox);
        me.bbox.height = 0;
        me.bbox.width = maxWidth;

        if (Ext.isString(me.getTitle())) {
            me.drawTitle(maxWidth, maxHeight);
        }
        me.drawDescriptions(me.getWidth());
        // me.drawTopBox();
    }, 

    drawTopBox: function() {
        var me = this,
            surface = me.getSurface('main'),
            path = [];
    },


});
