( function( wp ) {
	var registerPlugin = wp.plugins.registerPlugin;
	var PluginDocumentSettingPanel = wp.editPost.PluginDocumentSettingPanel;
	var el = wp.element.createElement;
	var Text = wp.components.TextControl;
	var withSelect = wp.data.withSelect;
	var withDispatch = wp.data.withDispatch;
	var compose = wp.compose.compose;

	var MetaBlockField = compose(
		
		withDispatch(( dispatch , props ) => {

			return {
				setMetaFieldValue: function( value ) {
					dispatch( 'core/editor' ).editPost( { meta: { _sd_primary_cat : value } } );
				}
			}
	
		}),
		withSelect( function( select, props ) {
			return {
				metaFieldValue: select( 'core/editor' )
					.getEditedPostAttribute( 'meta' )
					[ props.fieldName ],
			};
		} )
	)( function( props ) {
		return (
			<Text 
				label="Primary Category Item" 
				value={props.metaFieldValue}
				onChange={content => props.setMetaFieldValue( content )}
			/>
		);
		// return el( Text, {
		// 	label: 'Primary Category',
		// 	value: {props.metaFieldValue},
		// 	onChange: function( content ) {
		// 		props.setMetaFieldValue( content );
		// 	},
		// } );
	} );

	registerPlugin( 'my-plugin-panel', {
		render() {
			return (
				<PluginDocumentSettingPanel
					name="my-plugin-panel"
					title="Primary Category Panel"
				>
					<div className="plugin-panel-content">
						<MetaBlockField fieldName='_sd_primary_cat'/>
					</div>
				</PluginDocumentSettingPanel>
			)
		}
	} );
} )( window.wp );