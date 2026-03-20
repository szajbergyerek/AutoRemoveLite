Ext.ns('Deluge.plugins.AutoRemoveLite');

Deluge.plugins.AutoRemoveLite.PreferencesPage = Ext.extend(Ext.Panel, {
    title: _('AutoRemoveLite'),
    layout: 'form',
    border: false,
    bodyStyle: 'padding: 10px',
    autoHeight: true,

    initComponent: function () {
        Deluge.plugins.AutoRemoveLite.PreferencesPage.superclass.initComponent.call(this);

        this.add({
            xtype: 'label',
            text: _('Remove seeding torrents (with data) after:'),
            style: 'display:block; margin-bottom:8px; font-weight:bold;'
        });

        this.seedTime = this.add(
            new Ext.form.NumberField({
                fieldLabel: _('Seed time (hours)'),
                name: 'seed_time',
                value: 72,
                minValue: 1,
                maxValue: 8760,
                allowDecimals: false,
                width: 100
            })
        );
    },

    onApply: function () {
        var config = {
            seed_time: this.seedTime.getValue()
        };
        deluge.client.autoremovelite.set_config(config);
    },

    onShow: function () {
        Deluge.plugins.AutoRemoveLite.PreferencesPage.superclass.onShow.call(this);
        deluge.client.autoremovelite.get_config({
            success: function (config) {
                this.seedTime.setValue(config['seed_time']);
            },
            scope: this
        });
    }
});

Deluge.plugins.AutoRemoveLite.Plugin = Ext.extend(Deluge.Plugin, {
    name: 'AutoRemoveLite',

    onEnable: function () {
        this.prefsPage = Deluge.Preferences.addPage(
            new Deluge.plugins.AutoRemoveLite.PreferencesPage()
        );
    },

    onDisable: function () {
        Deluge.Preferences.removePage(this.prefsPage);
    }
});

Deluge.registerPlugin('AutoRemoveLite', Deluge.plugins.AutoRemoveLite.Plugin);
