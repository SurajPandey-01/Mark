from app.database import db

def save_results(input_data, seo, speed, uptime, creative, comp, compliance):
    
    
        result=db.results.insert_one({
            "company_url": input_data.company_url,
            "product_info": input_data.product_info,
            "competitors": input_data.competitors,
            "seo": seo,
            "page_speed": speed,
            "uptime": uptime,
            "creative": creative,
            "competitors_analysis": comp,
            "compliance": compliance
        })
        
