$(document).ready(function () {
	$.ajax({
		url: "api url", //Replace with url for get results API
		type: 'POST',
		data: 'call=ajax',
		success: function (resp) {
			var results = JSON.parse(resp)
			const list = results.Table
			ReactDOM.render(
				<div className="search-page-list">
					<Container 
						list={list} 
						userLanguage="en"/>
				</div>,
				document.getElementById('cse')
			)
		}
	})
})


const ListArticle = (props) =>{//stateless functional
	 render() {
		return (
			<div className="card">
				<div className="search-img-lft">
					<a href={props.link} target="_blank">
						<img src={props.image} alt="" />
					</a>
				</div>
				<div className="search-imgcont-rgt">
					<a href={props.link} target="_blank">
						<h3>
							{props.title}
						</h3>
						<p>{props.desc}</p>
					</a>
					<a href={props.link} target="_blank" className="default-link">{props.link}</a>
				</div>
			</div>
		);//return
	}//render
}//class


class List extends React.Component {
	render(){
        const liArt =[]
		const searchText = this.props.searchText.toLowerCase().replace(/[^a-z0-9]/g, '')
        var i = 0
        const brac = this.props.start
        const lim = brac + this.props.qtyPerPage
        if(this.props.userLanguage =="en"){
		    this.props.list.map((article)=>{
                    var artText = (article.enTitle + " " + article.URL + " " + article.enDescription + " " + article.AddInfo).toLowerCase().replace(/[^a-z0-9]/g, '')//regex removes special characters and lowercasses for maximum reach
			        if(artText.indexOf(searchText)===-1){
                        return
                    }
                    i++
                    if(brac<i && i<lim){
			            liArt.push(
							<ListArticle key={article.Image+article.URL}	//key can be replaced with any distinct string. Passing in i has two implications, {1. passing in i has performance implications per React documentation.
								title={article.enTitle}						// 2. in this context, not all articles will appear if i is the key.} In this particular api, banner images are returned separately to maximize possible reach, so URL is not necessarily unique.
								image={article.Image.includes(".jpg") ? article.Image : "/assets/placeholder.jpg" }// replace placeholder.jpg with your placeholder image
								link={JSON.stringify(article.HasLandingPage).toUpperCase()=="TRUE" ? "/en/"+article.URL : "/" + article.URL} //handles two possible options, direct download or landing page depending on data
								desc={article.enDescription} />
			            );//push
                    } //limit check  
            });//map
        } else{
		    this.props.list.map((article)=>{
                var artText = (article.esTitle + " " + article.URL + " " + article.esDescription + " " + article.AddInfo).toLowerCase().replace(/[^a-z0-9]/g, '')//regex removes special characters and lowercasses for maximum reach
			    if(artText.indexOf(searchText)===-1){
                    return
                }
                i++
                if(brac<i && i<lim){
			        liArt.push(
					        <ListArticle key={article.Image+article.URL}	//key can be replaced with any distinct string. Passing in i has two implications, {1. passing in i has performance implications per React documentation.
						        title={article.esTitle}						// 2. in this context, not all articles will appear if i is the key.} In this particular api, banner images are returned separately to maximize possible reach, so URL is not necessarily unique.
						        image={article.Image.includes(".jpg") ? article.Image : "/assets/placeholder.jpg" }// replace placeholder.jpg with your placeholder image
						        link={JSON.stringify(article.HasLandingPage).toUpperCase()=="TRUE" ? "/es/"+article.URL : "/" + article.URL}//handles two possible options, direct download or landing page depending on data
						        desc={article.esDescription} />
			        );//push
                } //limit check 
            });//map
        }
		return (
			<div className="search-page-listbox">
				{liArt}
			</div>
		);//return
	}//render
}//class


class SearchBar extends React.Component {
	constructor(props) {
		super(props)
		this.handleSearchChange = this.handleSearchChange.bind(this)
		this.handlePageChange = this.handlePageChange.bind(this)
	}
	handleSearchChange(e) {
		this.props.onFilterSearch(e.target.value)
	}
    handlePageChange(e) {
		this.props.onPageChange(e.target.className=="prev")
	}
	render(){
		return(
        <div>
			<input 
				type="text"
				className="common-text-field"
				placeholder="Search"
				value={this.props.searchText} 
				onChange={this.handleSearchChange}
			/>
            <button 
                style={{visibility: this.props.start>0 ? 'visible' : 'hidden' }}
                className="prev"
                onClick={this.handlePageChange}
            >{"< Prev"}</button>
            <button 
                style={{visibility: this.props.pages>this.props.curPage ? 'visible' : 'hidden' }}
                className="next"
                onClick={this.handlePageChange}
            >{"Next >"}</button>
        </div>
		);//return
	}//render
}//class


class Container extends React.Component{
	constructor(props){
		super(props);
        const qtyPerPage = 49; //init to 49 (50 items)
		this.state={
			searchText:'request value',//in prod, this is handled by initial request. use own method to get init value
            start:0,
            qtyPerPage:qtyPerPage,
            curPage:1,
            pages:1
		}
		this.handleSearchChange = this.handleSearchChange.bind(this)
		this.handlePageChange = this.handlePageChange.bind(this)
	}//constructor
	handleSearchChange(searchText){
		const proc = searchText.toLowerCase().replace(/[^a-z0-9]/g, '')
        var i = 0;
        if(this.props.userLanguage == "en"){
            this.props.list.map((article)=>{ //duplicated from list. need to work on efficiency, there has to be a better way
                var artText = (article.enTitle + " " + article.URL + " " + article.enDescription + " " + article.AddInfo).toLowerCase().replace(/[^a-z0-9]/g, '')//regex removes special characters and lowercasses for maximum reach
			    if(artText.indexOf(proc)===-1){
                    return
                }
                i++
            })
        } else{
            this.props.list.map((article)=>{//duplicated from list. need to work on efficiency, there has to be a better way
                var artText = (article.esTitle + " " + article.URL + " " + article.esDescription + " " + article.AddInfo).toLowerCase().replace(/[^a-z0-9]/g, '')//regex removes special characters and lowercasses for maximum reach
			    if(artText.indexOf(proc)===-1){
                    return
                }
                i++
            })
        }
		this.setState({
			searchText:searchText,
            pages:i/this.state.qtyPerPage
		})
	}//handleSearchChange
    handlePageChange(prevPage){
        if(prevPage){
            this.setState({
                start:this.state.start-this.state.qtyPerPage,
                curPage:this.state.curPage-1
            })
        }else{
            this.setState({//todo if not max hit
                start:this.state.start+this.state.qtyPerPage,
                curPage:this.state.curPage+1
            })
        }
    }//handlePageChange
	render(){
		return(
			<div>
				<SearchBar 
					searchText={this.state.searchText}
                    start={this.state.start}
                    qtyPerPage={this.state.qtyPerPage}
                    pages={this.state.pages}
                    curPage={this.state.curPage}
					onFilterSearch={this.handleSearchChange}
                    onPageChange={this.handlePageChange}
				 />
				<List 
					list={this.props.list}
					userLanguage={this.props.userLanguage}
					searchText={this.state.searchText}
                    start={this.state.start}
                    qtyPerPage={this.state.qtyPerPage}
				/>
			</div>
		)//return
	}//render
}