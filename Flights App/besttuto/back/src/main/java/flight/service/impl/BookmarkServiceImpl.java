/**
 * 
 */
package flight.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import flight.models.Bookmark;
import flight.repository.BookmarkRepository;
import flight.service.BookmarkService;

/**
 * @author BestTutorials
 *
 */
@Service
@Transactional
public class BookmarkServiceImpl implements BookmarkService {
	
	@Autowired
	private BookmarkRepository bookmarkRepository;

	/* (non-Javadoc)
	 * @see flight.service.BookmarkService#addBookmark(flight.models.Bookmark)
	 */
	@Override
	public Bookmark addBookmark(Bookmark bookmark) {
		return bookmarkRepository.save(bookmark);
	}

	@Override
	public List<Bookmark> getBookmarkList(String userName) {
		return bookmarkRepository.getBookmarkList(userName);
	}

	@Override
	public void deleteBookmark(Long idBookmark) {
		bookmarkRepository.deleteById(idBookmark);
		
	}



}
